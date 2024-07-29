import { ObjectId } from "mongodb"
import { insertBoleta, deleteReserva } from "./boletaController.js"

/**
 * Objeto que contiene los detalles de la boleta a insertar.
 * @type {Object}
 * @property {ObjectId} cliente_id - El ID del cliente.
 * @property {ObjectId} funcion_id - El ID de la función.
 * @property {string} asiento - El asiento reservado.
 * @property {boolean} estado_pago - Estado del pago de la boleta.
 * @property {number} monto_COP - Monto en COP de la boleta.
 */
let boletaDetalle = {
    cliente_id: new ObjectId('66a95397fca48b17e521f208'),
    funcion_id: new ObjectId('66a743091a52555cff546d3b'),
    asiento: "A2",
    estado_pago: false,
    monto_COP: 7000
}

// Llamada a la función insertBoleta con el objeto boletaDetalle y salida del resultado.
//console.log(await insertBoleta(boletaDetalle))

/**
 * Objeto que contiene los detalles de la boleta a insertar.
 * @type {ObjectId} ObjectId de la boleta que se desea eliminar
 */
let boletaId = new ObjectId('66a9e21b5519d848d1e5dc3b')


// Llamada a la función deleteReserva con el objeto boletaId y salida del resultado
//console.log(await deleteReserva(boletaId))