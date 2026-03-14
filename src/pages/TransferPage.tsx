import { useState } from "react";
import TransferForm from "../components/TransferForm";
import {
  createTransaction,
  type CreateTransactionPayload
} from "../services/transactionService";

export default function TransferPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleTransfer = async (payload: CreateTransactionPayload) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);
      await createTransaction(payload);
      setSuccess("Transaction completed successfully.");
    } catch (requestError) {
      const message = requestError instanceof Error ? requestError.message : "Transaction failed.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="rounded-xl bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-2xl font-bold text-slate-800">Transfer Money</h2>
      <p className="mb-6 text-sm text-slate-600">Fill in the form to send money from one account to another.</p>

      {success && <p className="mb-4 rounded-md bg-emerald-50 p-3 text-emerald-700">{success}</p>}
      {error && <p className="mb-4 rounded-md bg-red-50 p-3 text-red-700">{error}</p>}

      <TransferForm loading={loading} onSubmit={handleTransfer} />
    </section>
  );
}
