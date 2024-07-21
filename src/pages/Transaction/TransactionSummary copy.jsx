function TransactionSummary() {
  return (
    <div className="grid grid-cols-2 gap-5">
      <div>
        <h2 className="text-lg font-bold text-sky-600"> This Month Summary </h2>
        <table className="w-full border-e border-gray-700">
          <tr>
            <td>Previous Balance</td> <td className="w-20"> 0.00 </td>
          </tr>
          <tr>
            <td> Previous Debt</td> <td className="w-20"> 0.00 </td>
          </tr>
          <tr>
            <td>Total Balance</td> <td className="w-20"> 0.00 </td>
          </tr>
          <tr>
            <td>Total Income</td> <td className="w-20"> 0.00 </td>
          </tr>
          <tr>
            <td>Total Expanse</td> <td className="w-20"> 0.00 </td>
          </tr>
          <tr>
            <td>Total Give</td> <td className="w-20"> 0.00 </td>
          </tr>
          <tr>
            <td>Total Take</td> <td className="w-20"> 0.00 </td>
          </tr>
        </table>
      </div>

      <div className="">
        <h2 className="text-lg font-bold text-sky-600"> Overall Summary </h2>
        <table className="w-full ">
          <tr>
            <td>Total Balance</td> <td className="w-20"> 0.00 </td>
          </tr>
          <tr>
            <td>Total Income</td> <td className="w-20"> 0.00 </td>
          </tr>
          <tr>
            <td>Total Expanse</td> <td className="w-20"> 0.00 </td>
          </tr>
          <tr>
            <td>Total Give</td> <td className="w-20"> 0.00 </td>
          </tr>
          <tr>
            <td>Total Take</td> <td className="w-20"> 0.00 </td>
          </tr>
          
        </table>
      </div>
    </div>
  );
}

export default TransactionSummary;
