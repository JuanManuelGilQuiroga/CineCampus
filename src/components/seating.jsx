import "../../css/style.css";

export function Seating ({resFunc, row, day, func, onSeatClick, selectedSeats, setPriceClick}) {
    return (
        <div className={`flex w-[100%] justify-between items-center mb-1.5 ${row == "C" ? "mt-4" : ""}`}>
            <strong className="bg-transparent left-4 text-white w-[5%]">{row}</strong>
            <div className="w-[100%] flex justify-center items-center gap-1.5">
                {resFunc[day].funciones[func].sala_asientos.map(seat => {
                    if(seat.includes(row)){
                        return <div key={seat} className={`h-8 w-8 flex justify-center items-center rounded-lg bg-custom-black-323232 seat ${selectedSeats.includes(seat) ? "bg-custom-red" : ""}`} onClick={() => onSeatClick(seat)}>
                            <strong className={`text-[1rem] bg-transparent seat ${selectedSeats.includes(seat) ? "text-white" : "text-transparent"}`}>{seat.split("")[1]}</strong>
                        </div>
                    }
                })}
            </div>
        </div>
    )
}