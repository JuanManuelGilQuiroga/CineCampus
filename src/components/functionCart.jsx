import "../../css/style.css";

export function FunctionCard ({fecha, precio, tipo, onFunctionClick, index, functionPosition}) {
    let horas = new Date(fecha).getHours()
    let minutos = new Date(fecha).getMinutes()
    return (
        <button className={`flex flex-col items-center justify-around rounded-xl py-2 px-4 ${functionPosition === index ? "bg-custom-red": "bg-white"}`} onClick={() => onFunctionClick(index)}>
            <strong className={`text-[1.3rem] bg-transparent ${functionPosition === index ? "text-white": "text-black"}`}>{`${horas}:${minutos}`}</strong>
            <span className={`text-[0.7rem] bg-transparent ${functionPosition === index ? "text-white": "text-black"}`}>{`$${precio}-${tipo}`}</span>
        </button>
    )
}