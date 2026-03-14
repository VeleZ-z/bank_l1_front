import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomerTable from "../components/CustomerTable";
import { getCustomers } from "../services/customerService";
import type { Customer } from "../types/Customer";

export default function CustomersPage() {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCustomers() {
      try {
        setLoading(true);
        setError(null);
        const data = await getCustomers();
        setCustomers(data);
      } catch (requestError) {
        const message = requestError instanceof Error ? requestError.message : "Could not fetch customers.";
        setError(message);
      } finally {
        setLoading(false);
      }
    }

    loadCustomers();
  }, []);

  const openDashboard = (accountNumber: string) => {
    navigate(`/dashboard?account=${encodeURIComponent(accountNumber)}`);
  };

  return (
    <section className="rounded-xl bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-2xl font-bold text-slate-800">Customers</h2>

      {loading && <p className="text-slate-600">Loading customers...</p>}
      {error && <p className="mb-4 rounded-md bg-red-50 p-3 text-red-700">{error}</p>}
      {!loading && !error && customers.length === 0 && (
        <p className="rounded-md bg-slate-100 p-4 text-slate-600">No customers found.</p>
      )}
      {!loading && !error && customers.length > 0 && (
        <CustomerTable customers={customers} onOpenDashboard={openDashboard} />
      )}
    </section>
  );
}
