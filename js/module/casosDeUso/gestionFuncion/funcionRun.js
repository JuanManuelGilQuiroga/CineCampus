import { ObjectId } from "mongodb";
import { insertFuncion } from "./funcionController.js";

/**
 * Parámetros de la función a insertar.
 * @type {Object}
 * @property {ObjectId} pelicula_id - El ID de la película asociada a la función.
 * @property {ObjectId} sala_id - El ID de la sala donde se proyectará la película.
 * @property {Date} fecha_hora_inicio - La fecha y hora de inicio de la función.
 * @property {Date} fecha_hora_final - La fecha y hora de finalización de la función.
 * @property {number} precio_COP - El precio en COP de la función.
 */
let funcionInsertar = {
    pelicula_id: new ObjectId('66a597b03d45ef35a8b018ac'),
    sala_id: new ObjectId('66a58fab8a7ddb4b6799c27a'),
    fecha_hora_inicio: new Date('2024-07-25T21:30:00.000+00:00'),
    fecha_hora_final: new Date('2024-07-25T23:17:00.000+00:00'),
    precio_COP: 7000
}

// Llama a la función para insertar la función y muestra el resultado
console.log(await insertFuncion(funcionInsertar))