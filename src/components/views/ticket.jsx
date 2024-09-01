import React, { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import "../../../css/style.css";
import { Header } from "../header";


export const ticketLoader = async ({request}) => {
   const url = new URL(request.url);
   const dataString = url.searchParams.get('data');
   const dataDecoded = dataString ? JSON.parse(decodeURIComponent(dataString)) : null;
   console.log("loader data: ", data)
   const res = await fetch(`http://localhost:${import.meta.env.VITE_PORT_BACKEND}/users/v4?nick=${import.meta.env.VITE_MONGO_USER}`).json();
   const data = {...dataDecoded, cliente_id: res.data._id}
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
            
        </>
    )

}