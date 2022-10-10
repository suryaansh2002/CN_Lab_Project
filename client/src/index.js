import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { HashRouter, Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./Components/Home/Home";
import { useCookies } from 'react-cookie';

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
  <BrowserRouter>
   <App/>
   </BrowserRouter>
  </React.StrictMode>
);
