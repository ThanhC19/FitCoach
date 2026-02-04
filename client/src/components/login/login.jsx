import { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { loginUser } from "../../services/authService";

const Login = ({ onLogin }) => {
  const initialState = {
    username: "",
    password: "",
  };

  const [input, setInput] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { username, password } = input;
      await loginUser(username, password);
      onLogin();
      navigate("/home");
    } catch (error) {
      setError(error);
      setInput(initialState);
    }
  };

  return (
    <>
      {/* Main Card Container*/}
      <div className="w-full max-w-[720px] p-10 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-200/60 dark:shadow-none transition-all duration-500">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          
          <div className="text-center mb-2">
            {" "}
            {/* Logo Container */}
            <div className="flex justify-center w-full mb-2">
              <img
                src="/logo.png"
                alt="FitCoach Logo"
                style={{
                  height: "150px", 
                  width: "250px",
                  display: "block"
                }}
              />
            </div>

            <Typography
              variant="h4"
              className="text-slate-500 dark:text-slate-400 font-medium mt-1"
            >
              Welcome back! Ready for a workout?
            </Typography>
            
            {error && (
              <Typography
                variant="body2"
                sx={{ color: "error.main", mt: 1 }}
                className="font-medium"
              >
                {error}
              </Typography>
            )}
          </div>

          <TextField
            name="username"
            label="Username"
            variant="outlined"
            type="text"
            value={input.username}
            onChange={handleChange}
            required
            sx={{
              width: "97%", // Change width to 97%
              mx: "auto", // Centers the field within the parent div
              "& .MuiOutlinedInput-root": { borderRadius: "16px" },
              mb: 2, // Margin Bottom
              mt: 2, // Margin Top
            }} //CREATE THE MARGINS BETWEEN THE BOXES AND THE TEXTS
          />

          <TextField
            name="password"
            label="Password"
            variant="outlined"
            value={input.password}
            onChange={handleChange}
            required
            //Toggle type between 'password' and 'text'
            type={showPassword ? "text" : "password"}
            sx={{
              width: "97%",
              mx: "auto",
              "& .MuiOutlinedInput-root": { borderRadius: "16px" },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            variant="contained"
            className="py-4 font-bold bg-blue-600 hover:bg-blue-700 normal-case text-lg rounded-2xl shadow-lg shadow-blue-200 dark:shadow-none"
            sx={{
              mt: 2,
              mb: 2,
              display: "flex", // Ensures margin auto works
              mx: "auto", // Centers the button
              width: "97%",
              height: "56px",
              borderRadius: "16px",
              textTransform: "none",
            }}
          >
            Sign In
          </Button>

          {/* BIGGER OR DIVIDER */}
          <div className="flex items-center my-2 gap-4  mx-auto">
            <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
            <Typography
              variant="body2"
              className="text-slate-400 font-bold uppercase tracking-widest text-sm"
            >
              or
            </Typography>
            <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
          </div>

          <Button
            variant="outlined"
            onClick={() => navigate("/register")}
            className="py-3 font-bold border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
            sx={{
              mt: 1,
              mb: 2, // Added some bottom margin for breathing room
              display: "flex", // Ensures margin auto works
              mx: "auto", // Centers the button
              width: "97%",
              height: "56px",
              borderRadius: "16px",
              textTransform: "none",
            }}
          >
            Create New Account
          </Button>
        </form>
      </div>
    </>
  );
};

export default Login;
