import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/css/index.css";
import App from "./App";
import { ThemeProvider } from "@material-tailwind/react";
import { BrowserRouter, HashRouter } from "react-router-dom";
import InitAOS from "./components/AOS/AOS";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <InitAOS/>
    <App />
  </BrowserRouter>
);
