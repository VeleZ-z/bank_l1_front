import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import CustomersPage from "./pages/CustomersPage";
import DashboardPage from "./pages/DashboardPage";
import TransferPage from "./pages/TransferPage";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />
      <main className="mx-auto max-w-6xl p-4 sm:p-6">
        <Routes>
          <Route path="/" element={<CustomersPage />} />
          <Route path="/transfer" element={<TransferPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}
