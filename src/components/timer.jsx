import React, { useEffect, useState } from "react";

export function Timer() {
    const [timeLeft, setTimeLeft] = useState(299); // 300 segundos = 5 minutos

    useEffect(() => {
        const timer = setInterval(() => {
        setTimeLeft(timeLeft - 1);
        }, 1000); // 1000 milisegundos = 1 segundo
        console.log("hola")

        return () => clearInterval(timer);
    }, [timeLeft]);

    useEffect(() => {
        if (timeLeft === 0) {
            window.history.back()
        }
    }, [timeLeft]);

    return (
        <p className='text-custom-red bg-transparent'>{Math.floor(timeLeft / 60)}:{timeLeft % 60}</p>
    );
}