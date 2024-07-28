import { ObjectId } from "mongodb";

//Pelicula
{
    _id: new ObjectId(),
    titulo: "Whiplash",
    genero: "Drama",
    duracion_m: 107,
    sinopsis: "Andrew Neiman es un joven y ambicioso baterista de jazz. Marcado por el fracaso de la carrera literaria de su padre, está obsesionado con alcanzar la cima dentro del elitista conservatorio de música de la Costa Este en el que estudia.",
    estreno: new Date(),
    retiro: new Date()
}

//funcion
{
    _id: new ObjectId(),
    pelicula_id: new ObjectId(),
    sala_id: new ObjectId(),
    fecha_hora_inicio: new Date(),
    fecha_hora_final: new Date(),
    asientos: [
        "A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10",
        "B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10",
        "C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10",
        "D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "D10",
        "E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9", "E10",
        "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10",
        "G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9", "G10"
    ],
    precio_COP: 7000
}

//sala
{
    _id: new ObjectId(),
    nombre: "Sala #",
    asientos: [
        "A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10",
        "B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10",
        "C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10",
        "D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "D10",
        "E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9", "E10",
        "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10",
        "G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9", "G10"
    ]
}

//boleta
{
    _id: new ObjectId(),
    cliente_id: new ObjectId(),
    funcion_id: new ObjectId(),
    asiento: "A1",
    estado_pago: false
}

//movimiento
{
    _id: new ObjectId(),
    boleta_id: new ObjectId(),
    monto_COP: 7000
}

//cliente
{
    _id: new ObjectId(),
    nombre: "Juan",
    apellido: "Gil",
    nick: "juanMGQ",
    email: "jmgq2007@gmail.com",
    telefono: "315 6431235",
    tipo: "Admin/Estandar/Vip"
}