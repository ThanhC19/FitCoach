import { useState, useMemo,useEffect} from "react";
import { ThemeProvider, CssBaseline, IconButton } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { getCustomTheme } from "./theme";
import { Routes, Route, Navigate, Outlet } from "react-router";
import { getGoal } from "./services/goalsService"; 
import { getActivities } from "./services/activitiesService"
// Components
import Login from "./components/login/login";
import Register from "./components/register/register";
import Calendar from "./components/calendar/calendar";
import Sidebar from "./components/sidebar/sidebar";
import Goals from "./components/goals/goals";

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
      
      //  Check your console to see if GoalID actually exists
      console.log("Fetched Goal:", goal);

      if (goal && goal.GoalID) {
        // 2. Use the ID from the goal we just fetched
        const data = await getActivities(goal.GoalID);
        
        // Check if the database is returning an array
        console.log("Fetched Activities:", data);
        
        setEvents(data); 
      }
    } catch (err) {
      console.error("Failed to load activities:", err);
    }
  };

  loadCalendarData();
}, [isAuthenticated, refreshTrigger]); // Only runs when login state changes and that's why  refresh trigger was introduced fetch new data upon clicking on the gemere schedule button

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
              <DashboardLayout onLogout={() => {
                setIsAuthenticated(false)
                setEvents([]); // This clears the calendar data so the next user doesn't see it 
              }} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        >
          {/*All protected routes goes here*/}
          
          {/*pass the events state as a prop*/}
          <Route path="/home" element={<Calendar events={events} />} />
         
          {/*Pass setRefreshTrigger to the Goals component*/}
          <Route path="/goal-setting" element={<Goals onGoalCreated={() => setRefreshTrigger(prev => prev + 1)} />} />
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
