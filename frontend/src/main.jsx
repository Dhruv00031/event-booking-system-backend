import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { setAuthToken } from "./api/axios";
import "./index.css";
import "./styles.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const token = localStorage.getItem("token");
if (token) {
  setAuthToken(token);
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <App />
    <ToastContainer position="top-right" autoClose={2500} />
  </>
);
