import { useLoaderData } from "react-router";
import { Form } from "react-router-dom";

export const action2 = async ({request}) => {

    const data = await request.formData()
    console.log(data, "Se hizo un envio")
    return data
}

export const loader = ({params}) => {
    return {info:`hola mundo${params.id},${params.saludo}`}
}

export const Ejemplo = () => {

    const {info} = useLoaderData()

    function enviar (){

        let obj = {
            id: 1,
            name: "juan"
        }

        fetch(".", {method: "POST", body: JSON.stringify(obj)})

    }

    return (
        <>
        <h1 className="text-white">{info}</h1>
        <Form method="post">
                
            <button onSubmit={enviar} className="p-[20px] text-black bg-white" type="submit">mandar</button>
        </Form>
        </>
    )

}