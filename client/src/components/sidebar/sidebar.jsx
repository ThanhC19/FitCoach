import { Link, useLocation, useNavigate } from "react-router";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { logoutUser } from "../../services/authService";

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
        bgcolor: "#f5f5f5",
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        boxShadow: 3,
      }}
    >
      <Button
        component={Link} // the link is like the 'a' keyword but instead of refreshing the entire page it changes the url without reloading. SPA.
        to="/home"
        sx={{
          justifyContent: "flex-start",
          fontSize: "1.1rem",
          boxShadow:
            location.pathname === "/home" ? "0 0 10px #90caf9" : "none", // uses the uselocation to determine if the button should be highlighted or not
          backgroundColor:
            location.pathname === "/home"
              ? "rgba(144,202,249,0.2)"
              : "transparent",
        }}
      >
        Home
      </Button>

      <Button
        component={Link}
        to="/goal-setting"
        sx={{
          justifyContent: "flex-start",
          fontSize: "1.1rem",
          boxShadow:
            location.pathname === "/goal-setting" ? "0 0 10px #90caf9" : "none",
          backgroundColor:
            location.pathname === "/goal-setting"
              ? "rgba(144,202,249,0.2)"
              : "transparent",
        }}
      >
        Goal Setting
      </Button>

      <Button
        onClick={handleLogout} // Updated to use the async handler
        sx={{
          mt: "auto",
          justifyContent: "flex-start",
          fontSize: "1.1rem",
          color: "#d32f2f",
        }}
      >
        Logout
      </Button>
    </Box>
  );
}
