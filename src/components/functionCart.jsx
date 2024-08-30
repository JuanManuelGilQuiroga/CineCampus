import "../../css/style.css";

export function FunctionCard ({fecha, precio, tipo, onFunctionClick, index}) {
    let horas = new Date(fecha).getHours()
    let minutos = new Date(fecha).getMinutes()
    return (
        <button className="flex flex-col items-center justify-around w-[40%] rounded-xl bg-white py-2 px-4" onClick={() => onFunctionClick(index)}>
            <strong className="text-[1rem] bg-transparent">{`${horas}:${minutos}`}</strong>
            <span className="text-[0.5rem] bg-transparent">{`$${precio}-${tipo}`}</span>
        </button>
    )
}