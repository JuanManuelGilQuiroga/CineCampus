import { useLoaderData } from "react-router";
import { Link } from 'react-router-dom';
import { Header } from "../components/header";
import "../../css/style.css";

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
            <Header titulo="Cinema Selection"/>
            <iframe src={data.data[0].trailer} className="rounded-2xl w-[95vw] h-[25vh]"></iframe>
            <div className="flex justify-between w-[80vw] pt-4">
                <div className="flex flex-col">
                    <strong className="text-white">{data.data[0].titulo}</strong>
                    <span className="text-white text-sm">{data.data[0].genero}</span>
                </div>
                <div className="flex justify-around items-center bg-custom-red px-2 py-0 rounded-xl">
                    <i className='bx bx-play' style={{ color: 'white', background: "transparent", fontSize: "1.5rem"}}></i>
                    <span className="text-white bg-transparent text-sm">Watch Trailer</span>
                </div>
            </div>
            <div className="w-[80vw] pt-4">
                <p className="text-white text-sm">
                    {data.data[0].sinopsis}
                </p>
            </div>
            <div className="w-[80vw] flex flex-col justify-between pt-8">
                <strong className="text-white">Cast</strong>
                <div className="flex flex-row justify-between">
                    {data.data[0].cast.map((person, index) => {
                        return <div className="w-[30%] flex items-center" key={index}>
                                <img src={person.imagen_perfil} alt="" className="rounded-[100%] w-[30%] object-cover"/>
                                <div className="flex flex-col pl-2">
                                    <strong className="text-white text-[0.6rem]">{person.nombre}</strong>
                                    <span className="text-white text-[0.6rem]">{person.rol}</span>
                                </div>
                            </div>
                    })}
                </div>
            </div>
            <div className=" flex flex-col w-[80vw] h-[20vh] gap-3 pt-8">
                <strong className="text-white">Cinema</strong>
                <div className="flex justify-between items-center w-[100%] h-[40%] rounded-xl bg-custom-gray-272727 px-6">
                    <div className="bg-transparent flex flex-col justify-around rounded-xl">
                        <strong className="text-white text-[0.8rem] bg-transparent">CineCampus</strong>
                        <span className="text-white text-[0.6rem] bg-transparent">Zona Franca, Santander</span>
                    </div>
                    <img src="../../../public/campusCineLogo.jpg" alt="" className="object-cover h-[80%] rounded-lg"/>
                </div>
            </div>
            <Link to={`/function/${data.data[0]._id}`} className="bg-custom-red w-[80vw] h-[5vh] rounded-xl flex justify-center items-center">
                <strong className="bg-transparent text-white">Book Now</strong>
            </Link>
        </>
    )

}