import { ObjectId } from "mongodb"
import { insertMovimiento } from "./movimientoController.js"

let movimientoInsertar = {
    boleta_id: new ObjectId('66a95ceeff645c6c26929794'),
    monto_COP: 5600
}

console.log(await insertMovimiento(movimientoInsertar))