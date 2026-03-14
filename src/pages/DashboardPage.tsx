import { useEffect, useState, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import TransactionTable from "../components/TransactionTable";
import { getTransactionsByAccount } from "../services/transactionService";
import type { Transaction } from "../types/Transaction";

export default function DashboardPage() {
  const [searchParams] = useSearchParams();
  const [accountNumber, setAccountNumber] = useState(searchParams.get("account") ?? "");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadTransactions = async (account: string) => {
    if (!account.trim()) {
      setError("Please enter an account number.");
      setTransactions([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await getTransactionsByAccount(account.trim());
      setTransactions(data);
    } catch (requestError) {
      const message = requestError instanceof Error ? requestError.message : "Could not load transactions.";
      setError(message);
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const accountFromQuery = searchParams.get("account");
    if (accountFromQuery) {
      // Auto-load when coming from Customers view.
      void loadTransactions(accountFromQuery);
    }
  }, [searchParams]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await loadTransactions(accountNumber);
  };

  return (
    <section className="rounded-xl bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-2xl font-bold text-slate-800">Transactions Dashboard</h2>
      <p className="mb-6 text-sm text-slate-600">Search for an account to view transaction history.</p>

      <form className="mb-6 flex flex-col gap-3 sm:flex-row" onSubmit={handleSubmit}>
        <input
          type="text"
          value={accountNumber}
          onChange={(event) => setAccountNumber(event.target.value)}
          placeholder="Enter account number"
          className="w-full rounded-md border border-slate-300 px-3 py-2 focus:border-sky-500 focus:outline-none sm:max-w-sm"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-sky-600 px-4 py-2 font-semibold text-white hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {error && <p className="mb-4 rounded-md bg-red-50 p-3 text-red-700">{error}</p>}
      {!error && !loading && accountNumber.trim() && transactions.length === 0 && (
        <p className="mb-4 rounded-md bg-slate-100 p-3 text-slate-600">No transactions found.</p>
      )}

      <TransactionTable transactions={transactions} />
    </section>
  );
}
