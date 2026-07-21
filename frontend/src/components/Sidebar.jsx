import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import { useAuth } from "../context/AuthContext";

const navItems = [
  { label: "Overview", path: "/dashboard", icon: "grid", end: true },
  { label: "Income", path: "/dashboard/income", icon: "arrow-down" },
  { label: "Expenses", path: "/dashboard/expenses", icon: "arrow-up" },
  { label: "Goals", path: "/dashboard/goals", icon: "flag" },
];

const icons = {
  grid: <path d="M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 0h6v6h-6v-6z" />,
  "arrow-down": <path d="M12 4v14m0 0l-5-5m5 5l5-5" />,
  "arrow-up": <path d="M12 20V6m0 0l-5 5m5-5l5 5" />,
  flag: <path d="M5 3v18M5 4h11l-2 4 2 4H5" />,
};

export default function Sidebar() {
  const { user, logout } = useAuth();

  return (
    <aside className="hidden md:flex flex-col w-64 shrink-0 border-r border-white/5 bg-pine-light px-5 py-6">
      <Logo size={28} />
      <nav className="mt-10 flex flex-col gap-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                isActive ? "bg-marigold/15 text-marigold" : "text-cream-dim hover:text-cream hover:bg-white/5"
              }`
            }
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              {icons[item.icon]}
            </svg>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-white/5">
        <div className="flex items-center gap-3 px-1 mb-3">
          <div className="h-9 w-9 rounded-full bg-marigold/20 flex items-center justify-center text-marigold font-display font-semibold shrink-0">
            {user?.fullName?.[0]?.toUpperCase() || "U"}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-cream truncate">{user?.fullName || "User"}</p>
            <p className="text-xs text-cream-dim truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full text-left text-xs text-cream-dim hover:text-coral px-3.5 py-2 rounded-lg hover:bg-white/5 transition-colors"
        >
          Log out
        </button>
      </div>
    </aside>
  );
}
