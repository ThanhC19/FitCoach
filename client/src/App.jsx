import { useState, useMemo } from 'react';
import { ThemeProvider, CssBaseline, IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { getCustomTheme } from './theme';

// Components
import Login from './components/login/login';
import Register from './components/register/register';
import Calendar from "./components/calendar/calendar";

function App() {
  const [view, setView] = useState('login');
  const [mode, setMode] = useState('light');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Memoize theme to prevent unnecessary re-renders
  const theme = useMemo(() => getCustomTheme(mode), [mode]);

  const toggleTheme = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
    document.documentElement.classList.toggle('dark');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      {/* Global Theme Toggle */}
      <div className="fixed top-6 left-6 z-50">
        <IconButton onClick={toggleTheme} color="inherit" sx={{ border: '1px solid', borderColor: 'divider' }}>
          {mode === 'dark' ? <Brightness7 className="text-yellow-400" /> : <Brightness4 />}
        </IconButton>
      </div>
       
       {/* Authenticated and unathenticated logic */}
      <main className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 transition-colors duration-500">
        {isAuthenticated ? (
          <Dashboard onLogout={() => setIsAuthenticated(false)} />
        ) : (
          <AuthGateway 
            view={view} 
            setView={setView} 
            onLogin={() => setIsAuthenticated(true)} 
          />
        )}
      </main>
    </ThemeProvider>
  );
}

/*
 Sub-component for Authenticated Area
This keeps the main App code clean.
 */
function Dashboard() {
  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* 1. Add the Navbar here */}

      {/* 2. Content Area */}
      <div className="flex-grow flex flex-col items-center justify-center pt-24 pb-12 px-4">
        <div className="w-full max-w-4xl">
          <Calendar />
          <div className="mt-8 text-center">
            <p className="text-slate-400 font-mono italic">Welcome To FitCoach</p>
          </div>
        </div>
      </div>
    </div>
  );
}


//Sub-component for Login/Register toggle
function AuthGateway({ view, setView, onLogin }) {
  return view === 'login' ? (
    <Login onSwitch={() => setView('register')} onLogin={onLogin} />
  ) : (
    <Register onSwitch={() => setView('login')} />
  );
}

export default App;