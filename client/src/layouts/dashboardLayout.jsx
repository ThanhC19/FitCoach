import { Outlet } from "react-router";
import Sidebar from "../components/sidebar/sidebar";

function DashboardLayout({ onLogout }) {
  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-900 transition-colors duration-500">
      {/* Sidebar */}
      <Sidebar onLogout={onLogout} />

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center pt-24 pb-12 px-4">
        <div className="w-full max-w-4xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default DashboardLayout;
