import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import CssBaseline from '@mui/material/CssBaseline';

import { createTheme, ThemeProvider } from '@mui/material/styles';

// Definir un tema personalizado
const theme = createTheme({
  palette: {
    primary: { main: '#4E1F5A' },
    secondary: { main: '#D90036' },
    background: { default: '#ffffff' },
    accent: { main: '#4E1F5A' },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
