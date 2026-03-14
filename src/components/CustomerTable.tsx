import type { Customer } from "../types/Customer";

interface CustomerTableProps {
  customers: Customer[];
  onOpenDashboard: (accountNumber: string) => void;
}

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
});

export default function CustomerTable({ customers, onOpenDashboard }: CustomerTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200">
      <table className="min-w-full divide-y divide-slate-200 bg-white text-sm">
        <thead className="bg-slate-100 text-slate-700">
          <tr>
            <th className="px-4 py-3 text-left font-semibold">Name</th>
            <th className="px-4 py-3 text-left font-semibold">Account Number</th>
            <th className="px-4 py-3 text-left font-semibold">Balance</th>
            <th className="px-4 py-3 text-left font-semibold">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-slate-800">
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td className="px-4 py-3">{`${customer.firstName} ${customer.lastName}`}</td>
              <td className="px-4 py-3 font-mono">{customer.accountNumber}</td>
              <td className="px-4 py-3">{currencyFormatter.format(customer.balance)}</td>
              <td className="px-4 py-3">
                <button
                  onClick={() => onOpenDashboard(customer.accountNumber)}
                  className="rounded-md bg-sky-600 px-3 py-2 text-xs font-semibold text-white hover:bg-sky-700"
                  type="button"
                >
                  View Transactions
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
