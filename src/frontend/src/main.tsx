import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./assets/global.css";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from 'react-cookie';

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
    <CookiesProvider>
      <App />
    </CookiesProvider>  
    </BrowserRouter>
  </React.StrictMode>
);
