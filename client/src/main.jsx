import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { createTheme, ThemeProvider } from '@mui/material/styles';

// Definir un tema personalizado
const theme = createTheme({
  palette: {
    primary: { main: '#B90036' },
    secondary: { main: '#9c0027' },
    background: { default: '#FFFFFF' },
    accent: { main: '#B5CDB9' },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
