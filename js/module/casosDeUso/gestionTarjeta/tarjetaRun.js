import { ObjectId } from "mongodb";
import { deleteTarjeta, insertTarjeta } from "./tarjetaController.js";

/**
 * Objeto que representa una película a insertar en la base de datos.
 * @type {Object}
 * @property {ObjectId} cliente_id - El id del cliente.
 * @property {string} numero - El numero de tarjeta VIP del cliente.
 */
let tarjetaInsertar = {
    cliente_id: new ObjectId('66a908fc4d67f3146f6ea2ef'),
    numero: "1234 5678 9012 3456"
}

//inserta una nueva tarjeta VIP
console.log(await insertTarjeta(tarjetaInsertar))

let tarjetaEliminar = "1234 5678 9012 3456"

//console.log(await deleteTarjeta(tarjetaEliminar))