import React, { useEffect, useState } from 'react';
import { useLoaderData} from 'react-router-dom';
import "../../css/style.css";
import { Header } from "../components/header";
import { Timer } from '../components/timer';


export const paymentLoader = async ({request}) => {
   const url = new URL(request.url);
   const dataString = url.searchParams.get('data');
   const dataDecoded = dataString ? JSON.parse(decodeURIComponent(dataString)) : null;
   const res = await fetch(`http://localhost:${import.meta.env.VITE_PORT_BACKEND}/users/v4?nick=${import.meta.env.VITE_MONGO_USER}`);
   const response = await res.json();
   const data = {...dataDecoded, cliente_id: response.data._id}
   return {data}
}

export const Payment = () => {
    const {data} = useLoaderData()

    let diasSemana = {
        0: "Sun",
        1: "Mon",
        2: "Tue",
        3: "Wed",
        4: "Thu",
        5: "Fri",
        6: "Sat"
    }

    let mesesAño = {
        0: "Ene",
        1: "Feb",
        2: "Mar",
        3: "Abr",
        4: "May",
        5: "Jun",
        6: "Jul",
        7: "Ago",
        8: "Sep",
        9: "Oct",
        10: "Nov",
        11: "Dic",
    }

    const asientos = data.asientos.join(", ")

    const [isEnable, setIsEnable] = useState(false);

    const handleEnableClick = () => {
        if(isEnable){
            setIsEnable(false);
        } else{
            setIsEnable(true)
        }
    }

    const handlePayment = async () => {
        const dataMovement = await insertMovement(data);
        console.log(dataMovement.data)
        const boletos = await insertBoleta(dataMovement.data);
        let incompleteQuery = boletos.map(boleta => {
            return {
                ...boleta,
                pelicula_imagen: data.pelicula_imagen,
                pelicula_titulo: data.pelicula_titulo,
                funcion_fecha: data.funcion_fecha,
                precio_total: data.precio_total
            }
        })
        const queryString = new URLSearchParams({
            data: encodeURIComponent(JSON.stringify(incompleteQuery)),
        }).toString();
        window.location.href = `/ticket?${queryString}`;
    };
    
    const insertMovement = async (data) => {
        const dataForQuery = {
            cliente_id: data.cliente_id,
            monto_COP: data.precio_total,
            funcion_id: data.funcion_id,
            asientos: data.asientos,
        };
        const res = await fetch(`http://localhost:${import.meta.env.VITE_PORT_BACKEND}/payments/v1`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataForQuery),
        });
        
        const dataMovement = await res.json();
        console.log(dataMovement)
        return dataMovement;
    };
    
    const insertBoleta = async (dataMovement) => {
        let dataToSend = [];
        for (const asiento of data.asientos) {
            const res = await fetch(`http://localhost:${import.meta.env.VITE_PORT_BACKEND}/tickets/v1`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    movimiento_id: dataMovement._id,
                    funcion_id: data.funcion_id,
                    asiento: asiento,
                }),
            });
    
            const response = await res.json();
            dataToSend.push(response.data);
        }
        return dataToSend;
    };

    return (
        <>
            <div className=' w-[100vw] h-[35vh] flex flex-col justify-between items-center m-[-2rem] pt-8' style={{background: "linear-gradient(to bottom left, #272727 100%, #272727 0%)"}}>
                <Header titulo="Choose Seat"/>
                <div className='bg-transparent flex justify-between w-[80%] h-[60%] mb-[10%]'>
                    <img src={data.pelicula_imagen} alt="" className='rounded-xl object-cover'/>
                    <div className='flex flex-col justify-start bg-transparent'>
                        <h1 className='bg-transparent text-custom-red font-semibold'>{data.pelicula_titulo}</h1>
                        <p className='bg-transparent text-[0.8rem] text-custom-gray-9CA3AF font-medium'>{data.pelicula_genero}</p>
                        <h2 className='bg-transparent text-white mt-[30%] text-[0.9rem] font-medium'>CAMPUS MALL</h2>
                        <p className='bg-transparent text-[0.8rem] text-custom-gray-9CA3AF mt-[3%] font-medium'>{diasSemana[new Date(data.funcion_fecha).getDay()]}, {new Date(data.funcion_fecha).getDate()} {mesesAño[new Date(data.funcion_fecha).getMonth()]} {new Date(data.funcion_fecha).getFullYear()}. {new Date(data.funcion_fecha).getHours()}:{new Date(data.funcion_fecha).getMinutes()}</p>
                    </div>
                </div>
            </div>
            <div className='flex mt-[15%] w-[80vw]'>
                <h5 className='text-custom-gray-9CA3AF font-medium text-[0.8rem]'>ORDER NUMBER: </h5><p className='text-white ml-1 font-medium text-[0.8rem]' >123456786</p>
            </div>
            <div className='flex flex-col justify-between w-[80vw] h-[18vh] my-6'>
                <div className='flex justify-between'>
                    <h1 className='font-medium text-custom-gray-9CA3AF'>{data.asientos.length} {data.asientos.length > 1 ? "TICKETS" : "TICKET"}</h1>
                    <h2 className='font-medium text-custom-gray-9CA3AF'>{asientos}</h2>
                </div>
                <hr className='bg-custom-gray-9CA3AF'/>                <div className='flex justify-between'>
                    <h1 className='font-medium text-custom-gray-9CA3AF'>PRICE</h1>
                    <h2 className='font-medium text-custom-gray-9CA3AF'>${data.precio_total}</h2>
                </div>
                <hr className='bg-custom-gray-9CA3AF'/>                <div className='flex justify-between'>
                    <h1 className='font-medium text-custom-gray-9CA3AF'>SERVICE FEE</h1>
                    <h2 className='font-medium text-custom-gray-9CA3AF'>$500</h2>
                </div>
                <hr className='bg-custom-gray-9CA3AF'/>
            </div>
            <div className='flex flex-col justify-between h-[20vh] w-[80vw] '>
                <h1 className='text-white font-medium text-[1.2rem]'>Payment method</h1>
                <div className='w-[100%] flex justify-between items-center border border-custom-gray-9CA3AF p-3 rounded-xl' style={{background: "linear-gradient(to bottom left, #272727 100%, #272727 0%)"}}>
                    <img src="../../../public/Mastercard.png" alt="" className='w-[25%] bg-transparent'/>
                    <div className='w-[50%] bg-transparent'>
                        <h2 className='text-white bg-transparent'>MasterCard</h2>
                        <p className='text-white bg-transparent text-[0.8rem]'>**** **** 0998 7865</p>
                    </div>
                    <div className={`w-7 h-7 rounded-full ${isEnable ? "bg-custom-red" : "bg-custom-wine-381818"}`} onClick={() => handleEnableClick()}></div>
                </div>
                <div className='w-[80vw] flex justify-between items-center rounded-lg bg-custom-wine-381818 p-2'>
                    <p className='text-white bg-transparent text-[0.8rem]'>Complete your payment in</p>
                    <Timer/>
                </div>
            </div>
            <div className={` w-[80vw] h-[5vh] rounded-xl flex justify-center items-center mt-8 ${isEnable ? "bg-custom-red" : "bg-custom-wine-381818"}`} onClick={() => handlePayment()} >
                <strong className={`bg-transparent ${isEnable ? "text-white" : "text-custom-red font-light"}`}>Buy Ticket</strong>
            </div>
        </>
    )

}