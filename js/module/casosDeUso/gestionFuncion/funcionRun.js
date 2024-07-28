import { ObjectId } from "mongodb";
import { insertFuncion } from "./funcionController.js";

let funcionInsertar = {
    pelicula_id: new ObjectId('66a597b03d45ef35a8b018ac'),
    sala_id: new ObjectId('66a58fab8a7ddb4b6799c27a'),
    fecha_hora_inicio: new Date('2024-07-25T21:30:00.000+00:00'),
    fecha_hora_final: new Date('2024-07-25T23:17:00.000+00:00'),
    precio_COP: 7000
}

console.log(await insertFuncion(funcionInsertar))