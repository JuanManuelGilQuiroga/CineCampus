import { ObjectId } from "mongodb"
import { insertMovimiento } from "./movimientoController.js"

/**
 * Parámetros de la función a insertar.
 * @type {Object}
 * @property {ObjectId} boleta_id - El ID de la boleta asociada al movimiento.
 * @property {int} monto_COP - El monto a pagar
 */
let movimientoInsertar = {
    boleta_id: new ObjectId('66a95ceeff645c6c26929794'),
    monto_COP: 5600
}
 //Inserta un movimiento
console.log(await insertMovimiento(movimientoInsertar))