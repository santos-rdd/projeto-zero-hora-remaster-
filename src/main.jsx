import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import { BrowserRouter } from 'react-router-dom'; 

const div = document.getElementById("root");
const root = ReactDOM.createRoot(div);

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);
