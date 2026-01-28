import { useState, useMemo } from 'react';
import { ThemeProvider, createTheme, CssBaseline, IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import Login from './components/login/login';
import Register from './components/register/register';
import Calendar from "./components/calendar/calendar";

function App() {
  const [view, setView] = useState('login');
  const [mode, setMode] = useState('light');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const toggleTheme = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
    document.documentElement.classList.toggle('dark');
  };

  const theme = useMemo(() =>
    createTheme({
      palette: {
        mode, //  light vs dark

        ...(mode === 'light'
          ? {
            // 🌞 LIGHT MODE
            background: {
              default: '#f8fafc',
              paper: '#ffffff',
            },
            text: {
              primary: '#0f172a',
              secondary: '#475569',
            },
          }
          : {
            // 🌙 DARK MODE
            background: {
              default: '#0f172a',
              paper: '#1e293b',
            },
            text: {
              primary: '#f1f5f9',
              secondary: '#94a3b8',
            },
          }),

        primary: { main: '#3b82f6' },
        secondary: { main: '#a855f7' },
      },

      shape: { borderRadius: 16 },
    }),
    [mode]);


  // TODO: PROTECTED ROUTES / AUTHENTICATED AREA
  if (isAuthenticated) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 transition-colors duration-500">

          <div className="text-center">
            {/* TODO: 
                1. Import  Calendar and Goals components here.
                2. Wrap this in a proper Router  once routes are done.
                3. Add a  Sidebar/Navbar Here.
            */}
            <Calendar />
            <p className="text-slate-400 font-mono italic mb-4">
              Welcome To Fit
            </p>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all shadow-lg"
            >
              Logout
            </button>
          </div>
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* FIXED THEME TOGGLE: This stays in the top left of the window */}
      <div className="fixed top-6 left-6 z-50">
        <IconButton onClick={toggleTheme} color="inherit" sx={{ border: '1px solid', borderColor: 'divider' }}>
          {mode === 'dark' ? <Brightness7 className="text-yellow-400" /> : <Brightness4 />}
        </IconButton>
      </div>

      {/* Added flex, items-center, and justify-center below */}
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 transition-colors duration-500">
        {view === 'login' ? (
          <Login
            onSwitch={() => setView('register')}
            onLogin={() => setIsAuthenticated(true)}
            toggleTheme={toggleTheme}
            mode={mode}
          />
        ) : (
          <Register
            onSwitch={() => setView('login')}
            toggleTheme={toggleTheme}
            mode={mode}
          />
        )}
      </div>

    </ThemeProvider>
  );
}

export default App;
