import { useLoaderData } from "react-router";
import "../../../css/style.css"

export const movieLoader = async ({params}) => {
    let detallesPelicula = await fetch(`http://localhost:${import.meta.env.VITE_PORT_BACKEND}/movies/v2?_id=${params.id}`);
    let data = await detallesPelicula.json();
    console.log(data.data)
    return data
}

export const MovieDetails = () => {
    const data = useLoaderData()

    return (
        <>
            <div className="flex items-center justify-around w-full h-[8vh]">
                <i className='bx bxs-chevron-left' style={{color: "white"}}></i>
                <strong className="text-white">Cinema Selection</strong>
                <i className='bx bx-dots-vertical-rounded' style={{color: "white"}}></i>
            </div>
            <iframe src={data.data[0].trailer} className="rounded-2xl w-[95vw] h-[25vh]"></iframe>
            <div className="flex justify-between w-[80vw] pt-4">
                <div className="flex flex-col">
                    <strong className="text-white">{data.data[0].titulo}</strong>
                    <span className="text-white text-sm">{data.data[0].genero}</span>
                </div>
                <div className="flex justify-around items-center bg-red-600 px-2 py-0 rounded-xl">
                    <i className='bx bx-play' style={{ color: 'white', background: "transparent", fontSize: "1.5rem"}}></i>
                    <span className="text-white bg-transparent text-sm">Watch Trailer</span>
                </div>
            </div>
            <div className="w-[80vw] pt-4">
                <p className="text-white">
                    {data.data[0].sinopsis}
                </p>
            </div>
            <div className="w-[80vw] h-[5vh] flex justify-between pt-8">
                {data.data[0].cast.map((person) => {
                    return <div className="w-[30%] flex items-center">
                        <img src={person.imagen_perfil} alt="" className="rounded-[100%] w-[30%] object-cover"/>
                        <div className="flex flex-col pl-2">
                            <strong className="text-white text-xs">{person.nombre}</strong>
                            <span className="text-white text-xs">{person.rol}</span>
                        </div>
                    </div>
                })}
            </div>
        </>
    )

}