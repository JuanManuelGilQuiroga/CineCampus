import React from "react";
import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import { HeaderIndex } from "./components/headerIndex";
import { NowPlaying } from "./components/nowPlaying";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <StrictMode>
        <React.Fragment>
            <div className="w-[80vw] h-[15vh] flex flex-col justify-between">
                <HeaderIndex />
                <div className="border-[1px] border-white rounded-[10px] flex items-center p-4">
                    <i class='bx bx-search' style={{color: "white", fontSize: "20px"}}></i>
                    <input type="text" placeholder="Search movie, cinema, gender..." className="px-2 border-none focus:outline-none"/>
                </div>
            </div>
        </React.Fragment>
        <NowPlaying />
    </StrictMode>
)
