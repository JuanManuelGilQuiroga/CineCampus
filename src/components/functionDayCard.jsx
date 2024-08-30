import "../../css/style.css";

export function FunctionDayCard ({fecha, onDayClick, index}) {
    let diasSemana = {
        0: "Sun",
        1: "Mon",
        2: "Tue",
        3: "Wed",
        4: "Thu",
        5: "Fri",
        6: "Sat"
    }
    return (
        <button key={index} className="flex flex-col items-center justify-between rounded-xl bg-white p-4" onClick={() => {onDayClick(index)}}>
                <span className="text-[1rem] bg-transparent">{diasSemana[new Date(fecha).getDay()]}</span>
                <strong className="text-[1.5rem] bg-transparent">{new Date(fecha).getDate()}</strong>
        </button>
    )
}