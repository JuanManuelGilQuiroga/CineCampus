import { ObjectId } from "mongodb"
import { insertBoleta } from "./boletaController.js"

let boletaDetalle = {
    cliente_id: new ObjectId('66a715232a2950e6300c298f'),
    funcion_id: new ObjectId('66a743091a52555cff546d3b'),
    asiento: "A1",
    estado_pago: true,
    monto_COP: 7000
}

console.log(await insertBoleta(boletaDetalle))