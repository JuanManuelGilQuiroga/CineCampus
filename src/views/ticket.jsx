import React, { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import "../../css/style.css";
import { Header } from "../components/header";


export const ticketLoader = async ({request}) => {
   const url = new URL(request.url);
   const dataString = url.searchParams.get('data');
   const data = dataString ? JSON.parse(decodeURIComponent(dataString)) : null;
   console.log("loader data: ", data)
   return {data}
}

export const Ticket = () => {
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


    return (
        <>
            <Header titulo="Ticket"></Header>
            <div className='flex flex-col mb-10'>
                {data.map(boleta => {
                    return ( 
                        <div className='flex flex-col justify-between items-center bg-white h-[70vh] w-[80vw] mt-10 rounded-2xl p-8'>
                            <div className='bg-transparent flex flex-col justify-between h-[25%] w-[100%]'>
                                <img src={boleta.pelicula_imagen} alt="" className='bg-transparent object-cover h-[70%] rounded-xl'/>
                                <strong className='bg-transparent text-[1.2rem]'>{boleta.pelicula_titulo}</strong>
                                <span className='bg-transparent text-custom-black-323232 text-[0.8rem]'>Show this ticket at the entrance</span>
                            </div>
                            <hr className='bg-custom-gray-9CA3AF w-[100%] h-[1px]'/>
                            <div className='bg-transparent flex justify-between items-center w-[100%] h-[10%]'>
                                <div className='bg-transparent'>
                                    <p className='bg-transparent font-medium text-custom-black-232323'>Cinema</p>
                                    <strong className='bg-transparent text-custom-black-232323'>CINECAMPUS</strong>
                                </div>
                                <img src="../../../public/campusCineLogo.jpg" alt="" className='bg-transparent object-cover h-[100%] rounded-lg'/>
                            </div>
                            <div className='grid grid-cols-2 grid-cols-[1fr,0.8fr] grid-rows-3 bg-transparent w-[100%] gap-4'>
                                <div className='bg-transparent'>
                                    <p  className='bg-transparent text-custom-gray-9CA3AF font-bold text-[0.8rem]'>Date</p>
                                    <p  className='bg-transparent font-bold text-[0.8rem]'>{diasSemana[new Date(boleta.funcion_fecha).getDay()]}, {mesesAño[new Date(boleta.funcion_fecha).getMonth()]} {new Date(boleta.funcion_fecha).getDate()}th {new Date(boleta.funcion_fecha).getFullYear()}</p>
                                </div>
                                <div className='bg-transparent'>
                                    <p  className='bg-transparent text-custom-gray-9CA3AF font-bold text-[0.8rem]'>Time</p>
                                    <p  className='bg-transparent font-bold text-[0.8rem]'>{new Date(boleta.funcion_fecha).getHours()}:{new Date(boleta.funcion_fecha).getMinutes()}</p>
                                </div>
                                <div className='bg-transparent'>
                                    <p  className='bg-transparent text-custom-gray-9CA3AF font-bold text-[0.8rem]font-bold text-[0.8rem]'>CineCampus #</p>
                                    <p  className='bg-transparent font-bold text-[0.8rem]'>CineCampus</p>
                                </div>
                                <div className='bg-transparent'>
                                    <p  className='bg-transparent text-custom-gray-9CA3AF font-bold text-[0.8rem]'>Seat</p>
                                    <p  className='bg-transparent font-bold text-[0.8rem]'>{boleta.asiento}</p>
                                </div>
                                <div className='bg-transparent'>
                                    <p  className='bg-transparent text-custom-gray-9CA3AF font-bold text-[0.8rem]'>Total Cost</p>
                                    <p  className='bg-transparent font-bold text-[0.8rem]'>${boleta.precio_total}</p>
                                </div>
                                <div className='bg-transparent'>
                                    <p  className='bg-transparent text-custom-gray-9CA3AF font-bold text-[0.8rem]'>Order ID</p>
                                    <p  className='bg-transparent font-bold text-[0.8rem] flex flex-wrap'>{boleta._id}</p>
                                </div>
                            </div>
                            <hr className='bg-custom-black-121212 flex w-[80vw] h-[1px] m-0 p-0'/>
                            <div className='w-[100%] bg-transparent flex justify-center items-center'>
                                <img alt='Barcode Generator TEC-IT'
                                src={`https://barcode.tec-it.com/barcode.ashx?data=${boleta._id}&code=Code128&translate-esc=on`}/>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )

}