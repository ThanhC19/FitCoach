import { Outlet } from "react-router";

function AuthLayout() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 dark:bg-slate-900 px-4 transition-colors duration-500">
      <div className="w-full flex justify-center items-center">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
