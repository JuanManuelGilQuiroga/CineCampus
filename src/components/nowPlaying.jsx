import React, { useEffect, useState } from "react";
import "../../css/style.css"

export function NowPlaying () {

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch(`http://${import.meta.env.VITE_EXPRESS_HOST}:${import.meta.env.VITE_EXPRESS_PORT}/movies/v3`)
            .then((res) => res.json())
            .then((data) => {console.table(data), setMovies(data)})
            .catch(error => console.error(error))
    }, []);

    return (
        <React.Fragment>
            <div className="flex justify-between w-[80vw] pt-8">
                <h1 className="text-white text-lg">Now Playing</h1>
                <strong className="text-red-600 text-lg">See all</strong>
            </div>
            <div>
                {
                    movies.data.map((movie) => {
                        <div key={movie.id}>
                            <img src={movie.imagen} alt="" />
                        </div>
                    })
                }
            </div>
        </React.Fragment>
    )
}