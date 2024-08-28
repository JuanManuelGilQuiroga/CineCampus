import { useLoaderData } from "react-router";

export const loader = ({params}) => {
    return {info:`hola mundo${params.id},${params.saludo}`}
}

export const Ejemplo = () => {

    const {info} = useLoaderData()

    return (
        <h1 className="text-white">{info}</h1>
    )

}