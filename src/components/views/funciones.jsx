import { useLoaderData } from "react-router";
import { Link } from 'react-router-dom';
import "../../../css/style.css";

export const functionLoader = async ({params}) => {
    let detallesPelicula = await fetch(`http://localhost:${import.meta.env.VITE_PORT_BACKEND}/movies/v2?_id=${params.id}`);
    let data = await detallesPelicula.json();
    console.log(data.data)
    return data
}

export const Function = () => {
    const data = useLoaderData()

    return (
        <>
            
        </>
    )

}