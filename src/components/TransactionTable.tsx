import type { Transaction } from "../types/Transaction";

interface TransactionTableProps {
  transactions: Transaction[];
}

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
});

function formatDate(timestamp: string): string {
  return new Date(timestamp).toLocaleString();
}

export default function TransactionTable({ transactions }: TransactionTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200">
      <table className="min-w-full divide-y divide-slate-200 bg-white text-sm">
        <thead className="bg-slate-100 text-slate-700">
          <tr>
            <th className="px-4 py-3 text-left font-semibold">Sender</th>
            <th className="px-4 py-3 text-left font-semibold">Receiver</th>
            <th className="px-4 py-3 text-left font-semibold">Amount</th>
            <th className="px-4 py-3 text-left font-semibold">Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-slate-800">
          {transactions.length === 0 && (
            <tr>
              <td className="px-4 py-4 text-center text-slate-500" colSpan={4}>
                No transactions found for this account.
              </td>
            </tr>
          )}

          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td className="px-4 py-3 font-mono">{transaction.senderAccountNumber}</td>
              <td className="px-4 py-3 font-mono">{transaction.receiverAccountNumber}</td>
              <td className="px-4 py-3">{currencyFormatter.format(transaction.amount)}</td>
              <td className="px-4 py-3">{formatDate(transaction.timestamp)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
