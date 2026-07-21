import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-pine flex">
      <Sidebar />
      <main className="flex-1 px-6 md:px-10 py-8 max-w-6xl w-full">
        <Outlet />
      </main>
    </div>
  );
}
