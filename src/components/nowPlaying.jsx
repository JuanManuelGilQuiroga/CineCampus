import React, { useEffect, useState } from "react";
import { Carousel } from "./carousel";
import "../../css/style.css"


export function NowPlaying () {
    return (
        <React.Fragment>
            <div className="flex justify-between w-[80vw] pt-8">
                <h1 className="text-white text-lg">Now Playing</h1>
                <strong className="text-red-600 text-lg">See all</strong>
            </div>
            <Carousel />
        </React.Fragment>
    )
}