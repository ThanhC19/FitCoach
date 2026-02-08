import { useState, useMemo, useEffect } from "react";
import { ThemeProvider, CssBaseline, IconButton } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { getCustomTheme } from "./theme";
import { Routes, Route, Navigate } from "react-router";
import { getGoal } from "./services/goalsService";
import { getActivities } from "./services/activitiesService";
// Components
import Login from "./components/login/login";
import Register from "./components/register/register";
import Goals from "./components/goals/goals";
import Home from "./components/home/home";
import DashboardLayout from "./layouts/dashboardLayout";
import AuthLayout from "./layouts/authLayout";

function App() {
  const [mode, setMode] = useState("light");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [events, setEvents] = useState([]); // State to hold the user's activities
  const [refreshTrigger, setRefreshTrigger] = useState(0); // New trigger state

  useEffect(() => {
    const loadCalendarData = async () => {
      // Only fetch if authenticated
      if (!isAuthenticated) return;

      try {
        // 1. First, get the goal
        const goal = await getGoal();

        if (goal && goal.GoalID) {
          // 2. Use the ID from the goal we just fetched
          const data = await getActivities(goal.GoalID);

          setEvents(data);
        }
      } catch (err) {
        console.error("Failed to load activities:", err);
      }
    };

    loadCalendarData();
  }, [isAuthenticated, refreshTrigger]);

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
              <DashboardLayout
                onLogout={() => {
                  setIsAuthenticated(false);
                  setEvents([]); // This clears the calendar data so the next user doesn't see it
                }}
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        >
          {/*protected routes*/}

          <Route
            path="/home"
            element={<Home refreshTrigger={refreshTrigger} />}
          />

          
          <Route
            path="/goal-setting"
            element={
              <Goals
                onGoalCreated={() => setRefreshTrigger((prev) => prev + 1)}
              />
            }
          />
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

export default App;
