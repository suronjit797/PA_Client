import { useQuery } from "@tanstack/react-query";
import { getTransactionSummaryFn } from "../../transtackQuery/transactionApis";

function Summary() {
  const { data = {}, isPending } = useQuery({
    queryKey: ["summary"],
    queryFn: getTransactionSummaryFn,
  });

  const { presentMonth, lastMonth } = data;

  // savings
  const savings = Number(presentMonth?.save || 0) - Number(presentMonth?.withdraw || 0);
  const prevSavings = Number(lastMonth?.save || 0) - Number(lastMonth?.withdraw || 0);

  const balance = Number(presentMonth?.income) - (Number(presentMonth?.expense) + savings);
  const prevBalance = Number(lastMonth?.income) - (Number(lastMonth?.expense) + prevSavings);

  return (
    <div className="grid grid-cols-2  bg-accent px-5 py-3 rounded-md">
      <div>
        <h2 className="text-lg font-bold text-sky-600  ">Balance Summary </h2>
        <table className="w-full ">
          <tr>
            <td>Previous Balance</td> <td className="w-20 text-end pe-4"> {prevBalance?.toFixed(2)} </td>
          </tr>
          <tr>
            <td>Present Income</td>
            <td className="w-20 text-end pe-4"> {Number(presentMonth?.income || 0).toFixed(2)} </td>
          </tr>
          <tr>
            <td>Present Expense</td>
            <td className="w-20 text-end pe-4"> {Number(presentMonth?.expense || 0).toFixed(2)} </td>
          </tr>
          <tr>
            <td>Present Save</td> <td className="w-20 text-end pe-4"> {Number(presentMonth?.save || 0).toFixed(2)} </td>
          </tr>
          <tr>
            <td>Present Withdraw</td>
            <td className="w-20 text-end pe-4"> {Number(presentMonth?.withdraw || 0).toFixed(2)} </td>
          </tr>
          <tr>
            <td>Present Balance</td> <td className="w-20 text-end pe-4"> {(balance + prevBalance).toFixed(2)} </td>
          </tr>
        </table>
      </div>

      <div>
        <h2 className="text-lg font-bold ps-5 text-sky-600"> Debt Summary </h2>
        <table className="w-full ms-5">
          <tr>
            <td>Previous Give</td>
            <td className="w-20 text-end pe-4"> {Number(lastMonth?.give || 0).toFixed(2)} </td>
          </tr>
          <tr>
            <td>Previous Take</td>
            <td className="w-20 text-end pe-4"> {Number(lastMonth?.take || 0).toFixed(2)} </td>
          </tr>
          <tr>
            <td>Present Give</td>
            <td className="w-20 text-end pe-4"> {Number(presentMonth?.give || 0).toFixed(2)} </td>
          </tr>
          <tr>
            <td>Present Take</td>
            <td className="w-20 text-end pe-4"> {Number(presentMonth?.take || 0).toFixed(2)} </td>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default Summary;
