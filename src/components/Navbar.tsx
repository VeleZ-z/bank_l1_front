import { NavLink } from "react-router-dom";

const linkBase = "rounded-md px-3 py-2 text-sm font-medium transition-colors";

export default function Navbar() {
  return (
    <nav className="bg-slate-900 text-white shadow">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <h1 className="text-lg font-semibold">Bank</h1>
        <div className="flex gap-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? "bg-sky-500 text-white" : "text-slate-200 hover:bg-slate-700"}`
            }
          >
            Customers
          </NavLink>
          <NavLink
            to="/transfer"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? "bg-sky-500 text-white" : "text-slate-200 hover:bg-slate-700"}`
            }
          >
            Transfer
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? "bg-sky-500 text-white" : "text-slate-200 hover:bg-slate-700"}`
            }
          >
            Dashboard
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
