import { useState } from "react";
import "../../css/style.css";

export function Seating ({resFunc, row, day, func, onSeatClick, selectedSeats}) {
    const [isFree, setIsFree] = useState(true);

    const handleTakenClick = () => {  
        console.log("El asiento esta ocupado")
    };

    return (
        <div className={`flex w-[100%] justify-between items-center mb-1.5 ${row == "C" ? "mt-10" : ""}`}>
            <p className="bg-transparent left-4 text-white text-[0.8rem] w-[5%]">{row}</p>
            <div className="w-[100%] flex justify-center items-center gap-1.5">
            {console.log(selectedSeats)}
                {resFunc[day].funciones[func].sala_asientos.map(seat => {
                    if(seat.includes(row)){
                        return <div key={seat} className={`h-8 w-8 flex justify-center items-center rounded-lg  seat ${selectedSeats.includes(seat) ? "bg-custom-red" : ""} ${!(resFunc[day].funciones[func].asientos.includes(seat)) ? "bg-custom-white-CECECE" : "bg-custom-black-323232" }`} onClick={resFunc[day].funciones[func].asientos.includes(seat) ? () => onSeatClick(seat) : () => handleTakenClick() }>
                            <strong className={`text-[1rem] text-center bg-transparent seat ${selectedSeats.includes(seat) ? "text-white" : "text-transparent"}`}>{seat.split("")[1]}</strong>
                        </div>
                    }
                })}
            </div>
        </div>
    )
}