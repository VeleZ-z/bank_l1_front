import { useState, type ChangeEvent, type FormEvent } from "react";
import type { CreateTransactionPayload } from "../services/transactionService";

interface TransferFormProps {
  loading: boolean;
  onSubmit: (payload: CreateTransactionPayload) => Promise<void>;
}

interface FormState {
  senderAccountNumber: string;
  receiverAccountNumber: string;
  amount: string;
}

const initialState: FormState = {
  senderAccountNumber: "",
  receiverAccountNumber: "",
  amount: ""
};

export default function TransferForm({ loading, onSubmit }: TransferFormProps) {
  const [form, setForm] = useState<FormState>(initialState);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const amount = Number(form.amount);
    if (!form.senderAccountNumber || !form.receiverAccountNumber || Number.isNaN(amount) || amount <= 0) {
      setError("Please fill all fields and enter an amount greater than 0.");
      return;
    }

    await onSubmit({
      senderAccountNumber: form.senderAccountNumber,
      receiverAccountNumber: form.receiverAccountNumber,
      amount
    });

    setForm(initialState);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="senderAccountNumber">
          Sender account number
        </label>
        <input
          id="senderAccountNumber"
          name="senderAccountNumber"
          type="text"
          value={form.senderAccountNumber}
          onChange={handleChange}
          className="w-full rounded-md border border-slate-300 px-3 py-2 focus:border-sky-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="receiverAccountNumber">
          Receiver account number
        </label>
        <input
          id="receiverAccountNumber"
          name="receiverAccountNumber"
          type="text"
          value={form.receiverAccountNumber}
          onChange={handleChange}
          className="w-full rounded-md border border-slate-300 px-3 py-2 focus:border-sky-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="amount">
          Amount
        </label>
        <input
          id="amount"
          name="amount"
          type="number"
          step="0.01"
          min="0"
          value={form.amount}
          onChange={handleChange}
          className="w-full rounded-md border border-slate-300 px-3 py-2 focus:border-sky-500 focus:outline-none"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        disabled={loading}
        type="submit"
        className="rounded-md bg-sky-600 px-4 py-2 font-semibold text-white hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-slate-400"
      >
        {loading ? "Sending..." : "Send Transfer"}
      </button>
    </form>
  );
}
