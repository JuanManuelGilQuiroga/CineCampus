import { ObjectId } from "mongodb"
import { insertMovimiento } from "./movimientoController.js"

let movimientoInsertar = {
    boleta_id: new ObjectId(),
    monto_COP: 7000
}

console.log(await insertMovimiento(movimientoInsertar))