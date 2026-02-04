import { Link, useLocation, useNavigate } from "react-router";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { logoutUser } from "../../services/authService";
import HomeIcon from '@mui/icons-material/Home';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import LogoutIcon from '@mui/icons-material/Logout';

export default function Sidebar({ onLogout }) {
  const location = useLocation(); // uselocation() gives an object describing the current url in the app
  const navigate = useNavigate();

  const handleLogout = async () => {
        try {
            // 1. Call the API to destroy the session on the server
            await logoutUser(); 
            
            // 2. Clear any local state since we are passing a function from App.jsx)
            if (onLogout) onLogout(); 

            // 3. Redirect the user to the login page
            navigate("/login"); //
        } catch (error) {
            console.error("Logout failed:", error.message);
        }
    };

 return (
    <Box
      sx={{
        height: "100vh",
        width: 240,
        bgcolor: "inherit",
        p: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center", // Vertically centers the content in the sidebar
        alignItems: "center",     // Horizontally centers the buttons
        gap: 25,                   // Controls the gap between the nav group and logout
        boxShadow: 3,
      }}
    >
     
      {/* Navigation Group */}
      <Box 
        sx={{ 
          display: "flex", 
          flexDirection: "column", 
          gap: 2, // Controls spacing strictly between Home and Goal Setting
          width: "100%" 
        }}
      >
        <Button
          component={Link}
          to="/home"
          startIcon={<HomeIcon />}
          sx={{
            justifyContent: "center",
            fontSize: "1.1rem",
            boxShadow: location.pathname === "/home" ? "0 0 10px #90caf9" : "none",
            backgroundColor: location.pathname === "/home" ? "rgba(144,202,249,0.2)" : "transparent",
          }}
        >
          Home
        </Button>

        <Button
          component={Link}
          to="/goal-setting"
          startIcon={<TrackChangesIcon />}
          sx={{
            justifyContent: "center",
            fontSize: "1.1rem",
            boxShadow: location.pathname === "/goal-setting" ? "0 0 10px #90caf9" : "none",
            backgroundColor: location.pathname === "/goal-setting" ? "rgba(144,202,249,0.2)" : "transparent",
          }}
        >
          Goal Setting
        </Button>
      </Box>

      <Button
        onClick={handleLogout}
        startIcon={<LogoutIcon />}
        sx={{
          justifyContent: "center",
          fontSize: "1.1rem",
          color: "#d32f2f",
          width: "100%",
        }}
      >
        Logout
      </Button>
    </Box>
  );
}
