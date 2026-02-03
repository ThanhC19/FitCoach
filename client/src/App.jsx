import { useState, useMemo } from "react";
import { ThemeProvider, CssBaseline, IconButton } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { getCustomTheme } from "./theme";
import { Routes, Route, Navigate, Outlet } from "react-router";

// Components
import Login from "./components/login/login";
import Register from "./components/register/register";
import Calendar from "./components/calendar/calendar";
import Sidebar from "./components/sidebar/sidebar";
import Goals from "./components/goals/goals";

function App() {
  const [mode, setMode] = useState("light");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const theme = useMemo(() => getCustomTheme(mode), [mode]);

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
    document.documentElement.classList.toggle("dark");
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* Global Theme Changer */}
      <div className="fixed top-6 left-6 z-50">
        <IconButton
          onClick={toggleTheme}
          color="inherit"
          sx={{ border: "1px solid", borderColor: "divider" }}
        >
          {mode === "dark" ? (
            <Brightness7 className="text-yellow-400" />
          ) : (
            <Brightness4 />
          )}
        </IconButton>
      </div>

      <Routes>
        <Route element={<AuthLayout />}>
          {/* Public Routes */}
          <Route
            path="/login"
            element={<Login onLogin={() => setIsAuthenticated(true)} />}
          />
          <Route
            path="/register"
            element={<Register setIsAuthenticated={setIsAuthenticated} />}
          />
        </Route>

        {/* Authenticated Layout Route on Logout Event handler was added to handle logout request on the navbar*/}
        <Route
          element={
            isAuthenticated ? (
              <DashboardLayout onLogout={() => setIsAuthenticated(false)} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        >
          {/*All protected routes goes here*/}
          <Route path="/home" element={<Calendar />} />
          <Route path="/goal-setting" element={<Goals />} />
        </Route>

        {/* Fallback Redirects */}
        <Route
          path="/"
          element={
            <Navigate to={isAuthenticated ? "/home" : "/login"} replace />
          }
        />
        <Route
          path="*"
          element={
            <Navigate to={isAuthenticated ? "/home" : "/login"} replace />
          }
        />
      </Routes>
    </ThemeProvider>
  );
}

// {onLogout} between the () add this to line 60 when navbar is imported
// Helper function for the Dashboard Layout
function DashboardLayout({ onLogout }) {
  return (
    <div className="w-full min-h-screen flex bg-slate-50 dark:bg-slate-900 transition-colors duration-500">
      {/* Sidebar on the left */}
      <Sidebar onLogout={onLogout} />

      {/* Main content on the right */}
      <main className="flex-1 flex flex-col items-center justify-center pt-24 pb-12 px-4">
        <div className="w-full max-w-4xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

// Helper function for the AUTH Layout for register and login otherwise it will be on top left corner
function AuthLayout() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 dark:bg-slate-900 px-4 transition-colors duration-500">
      <div className="w-full flex justify-center items-center">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
