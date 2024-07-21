function TransactionSummary() {
  return (
    <div className="grid grid-cols-2 border border-slate-400 px-5 py-3 rounded-md">
      <div>
        <h2 className="text-lg font-bold text-sky-600 border-b border-slate-400 ">Balance Summary </h2>
        <table className="w-full border-e border-slate-400">
          <tr>
            <td>Previous Balance</td> <td className="w-20"> 0.00 </td>
          </tr>
          <tr>
            <td>Total Balance</td> <td className="w-20"> 0.00 </td>
          </tr>
          <tr>
            <td>Total Balance</td> <td className="w-20"> 0.00 </td>
          </tr>
        </table>
      </div>

      <div>
        <h2 className="text-lg font-bold ps-5 text-sky-600 border-b border-slate-400"> Debt Summary </h2>
        <table className="w-full ms-5">
          <tr>
            <td>Previous Debt</td> <td className="w-20"> 0.00 </td>
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
