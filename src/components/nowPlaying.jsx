import React, { useEffect, useState } from "react";
import "../../css/style.css"

export const consulta = async () => {
    let listarPeliculas = await fetch(`http://localhost:${import.meta.env.VITE_PORT_BACKEND}/movies/v3`).then(res=> res.json());
    let data = await listarPeliculas;
    console.log(data)
    return data
}

export function NowPlaying () {
    
    const [data, setData] = useState([])

    useEffect(() => {
            consulta().then(res => setData(res.data))
        }, [])
    console.log("hola",data)
    return (
        <React.Fragment>
            <div className="flex justify-between w-[80vw] pt-8">
                <h1 className="text-white text-lg">Now Playing</h1>
                <strong className="text-red-600 text-lg">See all</strong>
            </div>
            <div>
                {
                    data.map((movie) => {
                        return <div key={movie._id}>
                            <img src={movie.imagen} alt="" />
                        </div>
                    })
                }
            </div>
        </React.Fragment>
    )
}