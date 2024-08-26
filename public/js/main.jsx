import React from "react";
import ReactDOM from "react-dom/client";
import { HeaderUser } from "./components/headerUser";
import { StrictMode } from "react";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <StrictMode>
        <HeaderUser />
    </StrictMode>
)
