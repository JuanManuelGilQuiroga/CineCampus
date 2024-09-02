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
            <div className='flex flex-col justify-between items-center bg-white h-[70vh] w-[80vw] mt-10 rounded-2xl p-8'>
                <div className='bg-transparent flex flex-col justify-between h-[25%] w-[100%]'>
                    <img src="../../../public/campusCineLogo.jpg" alt="" className='bg-transparent object-cover h-[70%] border-black border-[3px] rounded-xl'/>
                    <strong className='bg-transparent text-[1.2rem]'>Puss in Boots The Last Wish</strong>
                    <span className='bg-transparent text-custom-black-323232 text-[0.8rem]'>Show this ticket at the entrance</span>
                </div>
                <hr className='bg-custom-gray-9CA3AF w-[100%] h-[1px]'/>
                <div className='bg-transparent flex justify-between items-center w-[100%] h-[10%]'>
                    <div className='bg-transparent'>
                        <p className='bg-transparent font-medium text-custom-black-232323'>Cinema</p>
                        <strong className='bg-transparent text-custom-black-232323'>CINECAMPUS</strong>
                    </div>
                    <img src="../../../public/campusCineLogo.jpg" alt="" className='bg-transparent object-cover h-[100%] rounded-lg border-black border-[3px]'/>
                </div>
                <div className='grid grid-cols-2 grid-cols-[1fr,0.8fr] grid-rows-3 bg-transparent w-[100%] gap-4'>
                    <div className='bg-transparent'>
                        <p  className='bg-transparent text-custom-gray-9CA3AF font-bold text-[0.8rem]'>Date</p>
                        <p  className='bg-transparent font-bold text-[0.8rem]'>Sun, Feb 12th 2023</p>
                    </div>
                    <div className='bg-transparent'>
                        <p  className='bg-transparent text-custom-gray-9CA3AF font-bold text-[0.8rem]'>Time</p>
                        <p  className='bg-transparent font-bold text-[0.8rem]'>13:00</p>
                    </div>
                    <div className='bg-transparent'>
                        <p  className='bg-transparent text-custom-gray-9CA3AF font-bold text-[0.8rem]font-bold text-[0.8rem]'>CineCampus #</p>
                        <p  className='bg-transparent font-bold text-[0.8rem]'>CineCampus</p>
                    </div>
                    <div className='bg-transparent'>
                        <p  className='bg-transparent text-custom-gray-9CA3AF font-bold text-[0.8rem]'>Seat</p>
                        <p  className='bg-transparent font-bold text-[0.8rem]'>C5</p>
                    </div>
                    <div className='bg-transparent'>
                        <p  className='bg-transparent text-custom-gray-9CA3AF font-bold text-[0.8rem]'>Total Cost</p>
                        <p  className='bg-transparent font-bold text-[0.8rem]'>$18.000</p>
                    </div>
                    <div className='bg-transparent'>
                        <p  className='bg-transparent text-custom-gray-9CA3AF font-bold text-[0.8rem]'>Order ID</p>
                        <p  className='bg-transparent font-bold text-[0.8rem]'>1234567890123456</p>
                    </div>
                </div>
                <hr className='bg-custom-black-121212 flex w-[80vw] h-[1px] m-0 p-0'/>
                <div className='w-[100%] h-[15%] bg-transparent flex justify-center items-center'>
                    <img alt='Barcode Generator TEC-IT'
                    src='https://barcode.tec-it.com/barcode.ashx?data=978020137962&code=EAN13&translate-esc=on' className='object-contain h-[100%]'/>
                </div>
            </div>
        </>
    )

}