import "./App.css";
import { useCookies } from "react-cookie";
import React, { useState, useEffect } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import axios from "axios";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import Item from "./Components/Item/Item";
import Cart from "./Components/Cart/Cart";

function App() {
  const [cookies, setCookie, removeCookie] = useCookies([]);
  return (
    <CookiesProvider>
      <Routes>
        <Route
          path="/"
          element={
            <Login
              cookies={cookies}
              setCookie={setCookie}
              removeCookie={removeCookie}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <Cart
              cookies={cookies}
              setCookie={setCookie}
              removeCookie={removeCookie}
            />
          }
        />

        <Route
          path="/home"
          element={
            <Home
              cookies={cookies}
              setCookie={setCookie}
              removeCookie={removeCookie}
            />
          }
        />
        <Route
          path="/items/:id"
          element={
            <Item
              cookies={cookies}
              setCookie={setCookie}
              removeCookie={removeCookie}
            />
          }
        />
      </Routes>
    </CookiesProvider>
  );
}

export default App;
