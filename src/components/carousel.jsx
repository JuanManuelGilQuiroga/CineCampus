import React, { useState, useEffect } from 'react';

export const consulta = async () => {
    let listarPeliculas = await fetch(`http://localhost:${import.meta.env.VITE_PORT_BACKEND}/movies/v3`);
    let data = await listarPeliculas.json();
    console.log(data)
    return data
}

export function Carousel () {

    const [data, setData] = useState([])

    useEffect(() => {
        consulta().then(res => setData(res.data))
    }, [])

    const [currentIndex, setCurrentIndex] = useState(0);
    const [touchStartX, setTouchStartX] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
    };

    // Manejo de toques para soporte táctil
    const handleTouchStart = (e) => {
        setTouchStartX(e.touches[0].clientX);
    };

    const handleTouchEnd = (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        if (touchStartX > touchEndX + 50) handleNext();
        if (touchStartX < touchEndX - 50) handlePrev();
    };

    // Manejar cambios de índice cuando el carrusel está en el centro
    useEffect(() => {
        // Cualquier lógica que necesites cuando el índice cambie
    }, [currentIndex]);

    return (
        <div className="flex relative w-[100vw] h-[60vh] overflow-hidden pt-8">
            <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                {data.map((movie, index) => (
                    <div key={movie._id} className="min-w-full h-[80%] flex flex-col items-center">
                        <img
                            src={movie.imagen}
                            alt={movie.titulo}
                            className="w-[60vw] object-cover rounded-3xl"
                        />
                        {currentIndex === index && (
                            <div className="bottom-16 text-center text-white pt-4">
                                <h2 className="text-lg font-bold">{movie.titulo}</h2>
                                <p className="text-sm">{movie.genero}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {data.map((_, index) => (
                    <div
                        key={index}
                        className={`h-2 w-2 rounded-full ${currentIndex === index ? 'bg-red-500' : 'bg-white'}`}
                    ></div>
                ))}
            </div>
            <button
                className="absolute top-1/2 left-4 -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
                onClick={handlePrev}
            >
                &#8249;
            </button>
            <button
                className="absolute top-1/2 right-4 -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
                onClick={handleNext}
            >
                &#8250;
            </button>
        </div>
    )
}