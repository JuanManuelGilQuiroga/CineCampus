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
    cliente_id: new ObjectId('66a715232a2950e6300c298f'),
    funcion_id: new ObjectId('66a743091a52555cff546d3b'),
    asiento: "A1",
    estado_pago: true,
    monto_COP: 7000
}

let boletaId = new ObjectId('66a7c74426300c4323f124c8')

// Llamada a la función insertBoleta con el objeto boletaDetalle y salida del resultado.
console.log(await insertBoleta(boletaDetalle))

//console.log(await deleteReserva(boletaId))