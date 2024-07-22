import { useQuery } from "@tanstack/react-query";
import { getTransactionOverallSummaryFn, getTransactionSummaryFn } from "../../transtackQuery/transactionApis";

function TransactionSummary() {
  const { data = {}, isPending } = useQuery({
    queryKey: ["summary"],
    queryFn: getTransactionSummaryFn,
  });
  const { data: overall = {}, isPending: overallPending } = useQuery({
    queryKey: ["overall"],
    queryFn: getTransactionOverallSummaryFn,
  });

  const { presentMonth, lastMonth } = data;

  // savings
  const savings = Number(presentMonth?.save || 0) - Number(presentMonth?.withdraw || 0);
  const prevSavings = Number(lastMonth?.save || 0) - Number(lastMonth?.withdraw || 0);
  const overallSavings = Number(overall?.save || 0) - Number(overall?.withdraw || 0);

  const balance = Number(presentMonth?.income) - (Number(presentMonth?.expense) + savings);
  const prevBalance = Number(lastMonth?.income) - (Number(lastMonth?.expense) + prevSavings);
  const overallBalance = Number(overall?.income) - (Number(overall?.expense) + overallSavings);

  return (
    <div className="grid grid-cols-2 gap-5">
      <div>
        <h2 className="text-lg font-bold text-sky-600 mb-4"> This Month Summary </h2>
        <table className="w-full border-e border-gray-700">
          <tr className="font-bold">
            <td>Previous Month Balance</td> <td className="w-20 text-right pe-5"> {prevBalance.toFixed(2)} </td>
          </tr>
          <tr className="font-bold">
            <td>Previous Month Savings</td> <td className="w-20 text-right pe-5"> {prevSavings.toFixed(2)} </td>
          </tr>
          <tr>
            <td>This Month Total Income</td>
            <td className="w-20 text-right pe-5"> {Number(presentMonth?.income || 0).toFixed(2)} </td>
          </tr>
          <tr>
            <td>This Month Total Expense</td>
            <td className="w-20 text-right pe-5"> {Number(presentMonth?.expense || 0).toFixed(2)} </td>
          </tr>
          <tr>
            <td>This Month Total Give</td>
            <td className="w-20 text-right pe-5"> {Number(presentMonth?.give || 0).toFixed(2)} </td>
          </tr>
          <tr>
            <td>This Month Total Take</td>
            <td className="w-20 text-right pe-5"> {Number(presentMonth?.take || 0).toFixed(2)} </td>
          </tr>
          <tr>
            <td>This Month Total Saving</td>
            <td className="w-20 text-right pe-5">{savings.toFixed(2)}</td>
          </tr>
          <tr className="font-bold text-green-600 border-t border-gray-500">
            <td>This Month Total Balance</td>{" "}
            <td className="w-20 text-right pe-5"> {(balance + prevBalance).toFixed(2)} </td>
          </tr>
        </table>
      </div>

      <div className="">
        <h2 className="text-lg font-bold text-sky-600 mb-4"> Overall Summary </h2>
        <table className="w-full ">
          <tr>
            <td>Total Income</td>
            <td className="w-20 text-right pe-5"> {Number(overall?.income || 0).toFixed(2)} </td>
          </tr>
          <tr>
            <td>Total Expense</td>
            <td className="w-20 text-right pe-5"> {Number(overall?.expense || 0).toFixed(2)} </td>
          </tr>
          <tr>
            <td>Total Savings</td>
            <td className="w-20 text-right pe-5"> {Number(overall?.save || 0).toFixed(2)} </td>
          </tr>
          <tr>
            <td>Total Withdraw</td>
            <td className="w-20 text-right pe-5"> {Number(overall?.withdraw || 0).toFixed(2)} </td>
          </tr>

          <tr>
            <td>Total Give</td>
            <td className="w-20 text-right pe-5"> {Number(overall?.give || 0).toFixed(2)} </td>
          </tr>
          <tr>
            <td>Total Take</td>
            <td className="w-20 text-right pe-5"> {Number(overall?.take || 0).toFixed(2)} </td>
          </tr>

          <tr className="font-bold text-green-600 border-t border-gray-500">
            <td>Total Balance</td>
            <td className="w-20 text-right pe-5"> {overallBalance.toFixed(2)} </td>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default TransactionSummary;
