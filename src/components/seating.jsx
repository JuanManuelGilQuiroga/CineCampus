import "../../css/style.css";

export function Seating ({resFunc, row, day, func}) {
    return (
        <div className="flex w-[100%] justify-center items-center">
            <strong className="absolute left-4 text-white">{row}</strong>
            <div className="flex items-center gap-1">
                {resFunc[day].funciones[func].sala_asientos.map(seat => {
                    if(seat.includes(row)){
                        return <div className="h-8 w-8 flex  rounded-lg bg-custom-black-323232 ">
                            <strong className="text-[1rem] bg-transparent">{seat.split()[1]}</strong>
                        </div>
                    }
                })}
            </div>
        </div>   
    )
}