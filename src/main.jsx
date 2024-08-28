import React from "react";
import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import { HeaderIndex } from "./components/headerIndex";
import { NowPlaying } from "./components/nowPlaying";
import { App } from "./app"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <StrictMode>
        <App />
    </StrictMode>
)
