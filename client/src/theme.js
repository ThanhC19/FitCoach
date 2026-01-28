import { createTheme } from '@mui/material';

export const getCustomTheme = (mode) => createTheme({
  palette: {
    mode,
    primary: { main: '#3b82f6' },
    secondary: { main: '#a855f7' },
    background: {
      default: mode === 'light' ? '#f8fafc' : '#0f172a',
      paper: mode === 'light' ? '#ffffff' : '#1e293b',
    },
    text: {
      primary: mode === 'light' ? '#0f172a' : '#f1f5f9',
      secondary: mode === 'light' ? '#475569' : '#94a3b8',
    },
  },
  shape: { borderRadius: 16 },
});