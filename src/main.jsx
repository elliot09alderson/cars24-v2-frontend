import { StrictMode } from "react";
import "./index.css";
import App from "./App.jsx";
import "@fontsource/racing-sans-one";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "../rtk/store/store.js";
import { ToastContainer, toast } from "react-toastify";
import { ThemeProvider } from "./context/ThemeContext.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ThemeProvider>
      <ToastContainer />
      <App />
    </ThemeProvider>
  </Provider>
);
