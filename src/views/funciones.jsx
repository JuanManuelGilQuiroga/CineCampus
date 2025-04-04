import React, { useEffect, useState } from 'react';
import { useLoaderData } from "react-router";
import { Link } from 'react-router-dom';
import "../../css/style.css";
import { FunctionCard } from "../components/functionCart";
import { FunctionDayCard } from "../components/functionDayCard";
import { Header } from "../components/header";
import { Seating } from "../components/seating";

export const functionLoader = async ({params}) => {
    let detallesPelicula = await fetch(`http://localhost:${import.meta.env.VITE_PORT_BACKEND}/movies/v2?_id=${params.id}`);
    let data = await detallesPelicula.json();
    return data
}

export const Function = () => {
    const data = useLoaderData()

    const [posicionDia, setPosicionDia] = useState(0);
    const [posicionFuncion, setPosicionFuncion] = useState(0);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const cambiarEstadoDia = (index) => {
        setPosicionDia(index)
    }

    const cambiarEstadoFuncion = (index) => {
        setPosicionFuncion(index)
    }
    
    let funciones = data.data.map(obj => {
        const fecha = new Date(obj.fecha_hora_inicio);
        return {
            funcion_id: obj.funcion_id,
            asientos: obj.asientos,
            sala_asientos: obj.sala_asientos,
            sala_nombre: obj.nombre,
            precio: obj.precio,
            tipo: obj.tipo,
            fecha_completa: obj.fecha_hora_inicio,
            dia_semana: fecha.getDay()
        }
    })

    let fechasFunciones = Array.from(new Set(funciones.map(obj => obj.fecha_completa.split('T')[0])))

    let resultFunciones = fechasFunciones.map((fecha) => {
        return {
            fecha: fecha, 
            funciones: funciones.filter(obj => obj.fecha_completa.includes(fecha))
        };
    });
    console.log(resultFunciones)

    const handleSeatClick = (seat) => {
        if(selectedSeats.includes(seat)){
            setSelectedSeats(selectedSeats.filter(id => id !== seat));
        } else{
            setSelectedSeats([...selectedSeats, seat])
        }
    }

    const setPrice = async (selectedSeats, id) => {
        let price = 0
        let dataForQuery = {
            _id: id,
            asientos: selectedSeats
        }
        let res = await fetch(`http://localhost:${import.meta.env.VITE_PORT_BACKEND}/functions/v3`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataForQuery)
        });
        let data = await res.json()
        price+=data.precio
        setTotalPrice(price)
    }

    useEffect(() => {
        setPrice(selectedSeats, resultFunciones[posicionDia].funciones[posicionFuncion].funcion_id);
    }, [selectedSeats]);

    useEffect(() => {
        setSelectedSeats([]);
        setTotalPrice(0)
        setPosicionFuncion(0)
    }, [posicionDia])

    useEffect(() => {
        setSelectedSeats([]);
        setTotalPrice(0)
    }, [posicionFuncion])

    const dataToSend = {
        pelicula_id: data.data[0]._id,
        pelicula_imagen: data.data[0].imagen,
        pelicula_titulo: data.data[0].titulo,
        pelicula_genero: data.data[0].genero,
        funcion_fecha: resultFunciones[posicionDia].funciones[posicionFuncion].fecha_completa,
        funcion_id: resultFunciones[posicionDia].funciones[posicionFuncion].funcion_id,
        asientos: selectedSeats,
        precio_total: totalPrice
    };
    const queryString = new URLSearchParams({
        data: encodeURIComponent(JSON.stringify(dataToSend)),
    }).toString();

    return (
        <>
            <Header titulo="Choose Seat"/>
            <div>
                <svg width="306" height="41" viewBox="0 0 306 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M110.895 28.4181C110.111 28.4181 109.439 28.2341 108.879 27.8661C108.327 27.4981 107.939 26.9941 107.715 26.3541L108.675 25.8021C109.003 26.8181 109.751 27.3261 110.919 27.3261C111.495 27.3261 111.935 27.2101 112.239 26.9781C112.543 26.7381 112.695 26.4221 112.695 26.0301C112.695 25.6301 112.543 25.3301 112.239 25.1301C111.935 24.9301 111.427 24.7181 110.715 24.4941C110.363 24.3821 110.095 24.2941 109.911 24.2301C109.727 24.1581 109.495 24.0541 109.215 23.9181C108.943 23.7741 108.739 23.6301 108.603 23.4861C108.467 23.3341 108.343 23.1381 108.231 22.8981C108.127 22.6581 108.075 22.3861 108.075 22.0821C108.075 21.3541 108.331 20.7781 108.843 20.3541C109.355 19.9221 109.979 19.7061 110.715 19.7061C111.379 19.7061 111.955 19.8741 112.443 20.2101C112.939 20.5461 113.311 20.9901 113.559 21.5421L112.623 22.0821C112.263 21.2181 111.627 20.7861 110.715 20.7861C110.259 20.7861 109.891 20.8981 109.611 21.1221C109.331 21.3461 109.191 21.6501 109.191 22.0341C109.191 22.4021 109.323 22.6821 109.587 22.8741C109.851 23.0661 110.307 23.2661 110.955 23.4741C111.187 23.5461 111.351 23.5981 111.447 23.6301C111.543 23.6621 111.691 23.7181 111.891 23.7981C112.099 23.8781 112.251 23.9421 112.347 23.9901C112.443 24.0381 112.571 24.1061 112.731 24.1941C112.899 24.2821 113.023 24.3661 113.103 24.4461C113.183 24.5261 113.275 24.6261 113.379 24.7461C113.491 24.8581 113.571 24.9741 113.619 25.0941C113.667 25.2141 113.707 25.3541 113.739 25.5141C113.779 25.6661 113.799 25.8301 113.799 26.0061C113.799 26.7421 113.531 27.3301 112.995 27.7701C112.459 28.2021 111.759 28.4181 110.895 28.4181ZM117.973 28.4181C117.069 28.4181 116.317 28.1181 115.717 27.5181C115.117 26.9101 114.817 26.1581 114.817 25.2621C114.817 24.3661 115.117 23.6181 115.717 23.0181C116.317 22.4101 117.069 22.1061 117.973 22.1061C118.565 22.1061 119.097 22.2501 119.569 22.5381C120.041 22.8181 120.393 23.1981 120.625 23.6781L119.749 24.1821C119.597 23.8621 119.361 23.6061 119.041 23.4141C118.729 23.2221 118.373 23.1261 117.973 23.1261C117.373 23.1261 116.869 23.3301 116.461 23.7381C116.061 24.1461 115.861 24.6541 115.861 25.2621C115.861 25.8621 116.061 26.3661 116.461 26.7741C116.869 27.1821 117.373 27.3861 117.973 27.3861C118.373 27.3861 118.733 27.2941 119.053 27.1101C119.373 26.9181 119.617 26.6621 119.785 26.3421L120.673 26.8581C120.417 27.3301 120.049 27.7101 119.569 27.9981C119.089 28.2781 118.557 28.4181 117.973 28.4181ZM122.76 23.2701C123.104 22.5261 123.728 22.1541 124.632 22.1541V23.2461C124.12 23.2221 123.68 23.3581 123.312 23.6541C122.944 23.9501 122.76 24.4261 122.76 25.0821V28.2621H121.716V22.2621H122.76V23.2701ZM126.057 25.7421C126.161 26.2781 126.405 26.6941 126.789 26.9901C127.181 27.2861 127.661 27.4341 128.229 27.4341C129.021 27.4341 129.597 27.1421 129.957 26.5581L130.845 27.0621C130.261 27.9661 129.381 28.4181 128.205 28.4181C127.253 28.4181 126.477 28.1221 125.877 27.5301C125.285 26.9301 124.989 26.1741 124.989 25.2621C124.989 24.3581 125.281 23.6061 125.865 23.0061C126.449 22.4061 127.205 22.1061 128.133 22.1061C129.013 22.1061 129.729 22.4181 130.281 23.0421C130.841 23.6581 131.121 24.4021 131.121 25.2741C131.121 25.4261 131.109 25.5821 131.085 25.7421H126.057ZM128.133 23.0901C127.573 23.0901 127.109 23.2501 126.741 23.5701C126.373 23.8821 126.145 24.3021 126.057 24.8301H130.065C129.977 24.2621 129.753 23.8301 129.393 23.5341C129.033 23.2381 128.613 23.0901 128.133 23.0901ZM133.042 25.7421C133.146 26.2781 133.39 26.6941 133.774 26.9901C134.166 27.2861 134.646 27.4341 135.214 27.4341C136.006 27.4341 136.582 27.1421 136.942 26.5581L137.83 27.0621C137.246 27.9661 136.366 28.4181 135.19 28.4181C134.238 28.4181 133.462 28.1221 132.862 27.5301C132.27 26.9301 131.974 26.1741 131.974 25.2621C131.974 24.3581 132.266 23.6061 132.85 23.0061C133.434 22.4061 134.19 22.1061 135.118 22.1061C135.998 22.1061 136.714 22.4181 137.266 23.0421C137.826 23.6581 138.106 24.4021 138.106 25.2741C138.106 25.4261 138.094 25.5821 138.07 25.7421H133.042ZM135.118 23.0901C134.558 23.0901 134.094 23.2501 133.726 23.5701C133.358 23.8821 133.13 24.3021 133.042 24.8301H137.05C136.962 24.2621 136.738 23.8301 136.378 23.5341C136.018 23.2381 135.598 23.0901 135.118 23.0901ZM142.294 22.1061C142.998 22.1061 143.562 22.3301 143.986 22.7781C144.41 23.2181 144.622 23.8181 144.622 24.5781V28.2621H143.578V24.6381C143.578 24.1501 143.446 23.7741 143.182 23.5101C142.918 23.2381 142.554 23.1021 142.09 23.1021C141.57 23.1021 141.15 23.2661 140.83 23.5941C140.51 23.9141 140.35 24.4101 140.35 25.0821V28.2621H139.306V22.2621H140.35V23.1261C140.774 22.4461 141.422 22.1061 142.294 22.1061ZM154.563 19.8621V20.9181H152.079V28.2621H150.975V20.9181H148.503V19.8621H154.563ZM158.548 22.1061C159.252 22.1061 159.816 22.3301 160.24 22.7781C160.664 23.2181 160.876 23.8181 160.876 24.5781V28.2621H159.832V24.6381C159.832 24.1501 159.7 23.7741 159.436 23.5101C159.172 23.2381 158.808 23.1021 158.344 23.1021C157.824 23.1021 157.404 23.2661 157.084 23.5941C156.764 23.9141 156.604 24.4101 156.604 25.0821V28.2621H155.56V19.8621H156.604V23.1261C157.028 22.4461 157.676 22.1061 158.548 22.1061ZM162.861 21.1701C162.661 21.1701 162.493 21.1021 162.357 20.9661C162.221 20.8301 162.153 20.6661 162.153 20.4741C162.153 20.2821 162.221 20.1181 162.357 19.9821C162.493 19.8381 162.661 19.7661 162.861 19.7661C163.053 19.7661 163.217 19.8381 163.353 19.9821C163.489 20.1181 163.557 20.2821 163.557 20.4741C163.557 20.6661 163.489 20.8301 163.353 20.9661C163.217 21.1021 163.053 21.1701 162.861 21.1701ZM162.333 28.2621V22.2621H163.377V28.2621H162.333ZM165.858 23.8821C165.858 24.1141 165.974 24.3021 166.206 24.4461C166.438 24.5821 166.718 24.6941 167.046 24.7821C167.374 24.8621 167.702 24.9581 168.03 25.0701C168.358 25.1741 168.638 25.3581 168.87 25.6221C169.102 25.8781 169.218 26.2101 169.218 26.6181C169.218 27.1621 169.006 27.5981 168.582 27.9261C168.166 28.2541 167.63 28.4181 166.974 28.4181C166.39 28.4181 165.89 28.2901 165.474 28.0341C165.058 27.7781 164.762 27.4381 164.586 27.0141L165.486 26.4981C165.582 26.7861 165.762 27.0141 166.026 27.1821C166.29 27.3501 166.606 27.4341 166.974 27.4341C167.318 27.4341 167.602 27.3701 167.826 27.2421C168.05 27.1061 168.162 26.8981 168.162 26.6181C168.162 26.3861 168.046 26.2021 167.814 26.0661C167.582 25.9221 167.302 25.8101 166.974 25.7301C166.646 25.6421 166.318 25.5421 165.99 25.4301C165.662 25.3181 165.382 25.1341 165.15 24.8781C164.918 24.6221 164.802 24.2941 164.802 23.8941C164.802 23.3741 165.002 22.9461 165.402 22.6101C165.81 22.2741 166.318 22.1061 166.926 22.1061C167.414 22.1061 167.846 22.2181 168.222 22.4421C168.606 22.6581 168.894 22.9621 169.086 23.3541L168.21 23.8461C167.994 23.3341 167.566 23.0781 166.926 23.0781C166.63 23.0781 166.378 23.1501 166.17 23.2941C165.962 23.4301 165.858 23.6261 165.858 23.8821ZM175.374 28.2621L172.962 19.8621H174.138L176.058 26.7741L178.098 19.8621H179.226L181.266 26.7741L183.186 19.8621H184.362L181.95 28.2621H180.654L178.662 21.5541L176.67 28.2621H175.374ZM189.707 22.2621H190.751V28.2621H189.707V27.2301C189.187 28.0221 188.431 28.4181 187.439 28.4181C186.599 28.4181 185.883 28.1141 185.291 27.5061C184.699 26.8901 184.403 26.1421 184.403 25.2621C184.403 24.3821 184.699 23.6381 185.291 23.0301C185.883 22.4141 186.599 22.1061 187.439 22.1061C188.431 22.1061 189.187 22.5021 189.707 23.2941V22.2621ZM187.571 27.4101C188.179 27.4101 188.687 27.2061 189.095 26.7981C189.503 26.3821 189.707 25.8701 189.707 25.2621C189.707 24.6541 189.503 24.1461 189.095 23.7381C188.687 23.3221 188.179 23.1141 187.571 23.1141C186.971 23.1141 186.467 23.3221 186.059 23.7381C185.651 24.1461 185.447 24.6541 185.447 25.2621C185.447 25.8701 185.651 26.3821 186.059 26.7981C186.467 27.2061 186.971 27.4101 187.571 27.4101ZM196.521 22.2621H197.637L195.189 28.6341C194.933 29.3141 194.573 29.8301 194.109 30.1821C193.653 30.5421 193.125 30.7021 192.525 30.6621V29.6901C193.261 29.7461 193.801 29.3381 194.145 28.4661L194.253 28.2381L191.637 22.2621H192.753L194.793 26.9661L196.521 22.2621Z" fill="white"/>
                <g filter="url(#filter0_d_2_1009)">
                <path d="M7 29.2619C85 -7.23758 207 -4.23804 299 29.2612" stroke="#FE0000" stroke-width="6" stroke-linecap="round"/>
                </g>
                <defs>
                <filter id="filter0_d_2_1009" x="-0.000717163" y="-6.10352e-05" width="306.002" height="40.2627" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="4"/>
                <feGaussianBlur stdDeviation="2"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2_1009"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2_1009" result="shape"/>
                </filter>
                </defs>
                </svg>
            </div>
            <div className="w-[90vw] mt-10 gap-1">
                <Seating resFunc={resultFunciones} row="A" day={posicionDia} func={posicionFuncion} onSeatClick={handleSeatClick} selectedSeats={selectedSeats} />
                <Seating resFunc={resultFunciones} row="B" day={posicionDia} func={posicionFuncion} onSeatClick={handleSeatClick} selectedSeats={selectedSeats} />
                <Seating resFunc={resultFunciones} row="C" day={posicionDia} func={posicionFuncion} onSeatClick={handleSeatClick} selectedSeats={selectedSeats} />
                <Seating resFunc={resultFunciones} row="D" day={posicionDia} func={posicionFuncion} onSeatClick={handleSeatClick} selectedSeats={selectedSeats} />
                <Seating resFunc={resultFunciones} row="E" day={posicionDia} func={posicionFuncion} onSeatClick={handleSeatClick} selectedSeats={selectedSeats} />
                <Seating resFunc={resultFunciones} row="F" day={posicionDia} func={posicionFuncion} onSeatClick={handleSeatClick} selectedSeats={selectedSeats} />
            </div>
            <div className="w-[80vw] flex justify-around items-center mt-8">
                <div className="flex justify-evenly w-[25%]">
                    <div className="h-3 w-3 bg-custom-black-323232 rounded-full"></div>
                    <span className="text-[0.7rem] text-white">Available</span>
                </div>
                <div className="flex justify-evenly w-[25%]">
                    <div className="h-3 w-3 bg-custom-white-CECECE rounded-full"></div>
                    <span className="text-[0.7rem] text-white">Reserved</span>
                </div>
                <div className="flex justify-evenly w-[25%]">
                    <div className="h-3 w-3 bg-custom-red rounded-full"></div>
                    <span className="text-[0.7rem] text-white">Selected</span>
                </div>
            </div>
            <div className="flex overflow-scroll mt-8 h-[10vh] w-[80vw] gap-4">
                {fechasFunciones.map((i, index) => {
                return <FunctionDayCard fecha={i} onDayClick={cambiarEstadoDia} index={index} day={posicionDia}/> 
                })}
            </div>
            <div className="flex overflow-scroll mt-8 h-[7vh] w-[80vw] gap-4">
                {resultFunciones[posicionDia].funciones.map(((obj, index) => {
                    return <FunctionCard fecha={obj.fecha_completa} precio={obj.precio} tipo={obj.tipo} onFunctionClick={cambiarEstadoFuncion} index={index} functionPosition={posicionFuncion} />
                }))}
            </div>
            <div className="flex justify-between w-[80vw] mt-10">
                <div>
                    <p className="text-white text-[1.3rem]">Price</p>
                    <strong className="text-white text-[1.3rem]">${totalPrice}</strong>
                </div>
                <Link to={selectedSeats.length > 0 ? `/payment?${queryString}`: `#`} className={` w-[50vw] h-[7vh] rounded-xl flex justify-center items-center ${selectedSeats.length > 0 ? "bg-custom-red" : "bg-custom-wine-381818"}`}>
                    <strong className={`bg-transparent ${selectedSeats.length > 0 ? "text-white" : "text-custom-red font-light"}`}>Buy Ticket</strong>
                </Link>
            </div>
        </>
    )

}