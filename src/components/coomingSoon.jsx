import React, { useEffect, useState } from 'react';
import "../../css/style.css";

export const query = async () => {
    let listarPeliculas = await fetch(`http://localhost:${import.meta.env.VITE_PORT_BACKEND}/movies/v4`);
    let data = await listarPeliculas.json();
    console.log(data)
    return data
}

export function CoomingSoon () {

    const [data, setData] = useState([])

    useEffect(() => {
        query().then(res => setData(res.data))
    }, [])

    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between w-[80vw] pt-8">
                <strong className="text-white text-lg">Cooming soon</strong>
                <strong className="text-custom-red text-lg">See all</strong>
            </div>
            <div className="w-[100%] ">
                {data.map((movie) => {
                    return <div key={movie._id} className="flex h-[10vh] bg-custom-gray-272727 rounded-xl p-3">
                        <img src={movie.imagen} alt="" className="object-cover rounded-xl"/>
                        <div className="bg-transparent pl-4">
                            <strong className="text-white bg-transparent">{movie.titulo}</strong>
                            <p className="text-white bg-transparent">{movie.genero}</p>
                        </div>
                    </div>
                })}
            </div>
        </div>    
    )
}