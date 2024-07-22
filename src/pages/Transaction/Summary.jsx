import { useQuery } from "@tanstack/react-query";
import { getTransactionSummaryFn } from "../../transtackQuery/transactionApis";

function Summary() {
  const { data = {} } = useQuery({
    queryKey: ["summary"],
    queryFn: getTransactionSummaryFn,
  });

  const { presentMonth, lastMonth } = data;

  // savings
  const savings = Number(presentMonth?.save || 0) - Number(presentMonth?.withdraw || 0);
  const prevSavings = Number(lastMonth?.save || 0) - Number(lastMonth?.withdraw || 0);

  const balance = Number(presentMonth?.income || 0) - (Number(presentMonth?.expense || 0) + savings);
  const prevBalance = Number(lastMonth?.income || 0) - (Number(lastMonth?.expense || 0) + prevSavings);

  return (
    <div className="grid grid-cols-2 gap-3 rounded-md">
      <div className="bg-card px-5 py-3 rounded-md">
        <h2 className="text-base font-bold mb-2 text-center  ">Balance Summary </h2>
        <table className="w-full ">
          <tr>
            <td>Previous Balance</td> <td className="w-28 text-end"> {prevBalance?.toFixed(2)} </td>
          </tr>
          <tr>
            <td>Present Income</td>
            <td className="w-28 text-end"> {Number(presentMonth?.income || 0).toFixed(2)} </td>
          </tr>
          <tr>
            <td>Present Expense</td>
            <td className="w-28 text-end"> {Number(presentMonth?.expense || 0).toFixed(2)} </td>
          </tr>
          <tr>
            <td>Present Save</td> <td className="w-28 text-end"> {Number(presentMonth?.save || 0).toFixed(2)} </td>
          </tr>
          <tr>
            <td>Present Withdraw</td>
            <td className="w-28 text-end"> {Number(presentMonth?.withdraw || 0).toFixed(2)} </td>
          </tr>
          <tr>
            <td>Present Balance</td> <td className="w-28 text-end"> {(balance + prevBalance).toFixed(2)} </td>
          </tr>
        </table>
      </div>

      <div className="bg-card px-5 py-3 rounded-md">
        <h2 className="text-base font-bold mb-2 text-center"> Debt Summary </h2>
        <table className="w-full">
          <tr>
            <td>Previous Give</td>
            <td className="w-28 text-end"> {Number(lastMonth?.give || 0).toFixed(2)} </td>
          </tr>
          <tr>
            <td>Previous Take</td>
            <td className="w-28 text-end"> {Number(lastMonth?.take || 0).toFixed(2)} </td>
          </tr>
          <tr>
            <td>Present Give</td>
            <td className="w-28 text-end"> {Number(presentMonth?.give || 0).toFixed(2)} </td>
          </tr>
          <tr>
            <td>Present Take</td>
            <td className="w-28 text-end"> {Number(presentMonth?.take || 0).toFixed(2)} </td>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default Summary;
