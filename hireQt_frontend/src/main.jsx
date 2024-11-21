import React from "react";
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from 'recoil'; // Import RecoilRoot
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RecoilRoot> {/* Wrap your App component with RecoilRoot */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>
);