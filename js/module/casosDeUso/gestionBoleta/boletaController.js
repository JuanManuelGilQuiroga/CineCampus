import { ObjectId } from "mongodb"
import {Boleta} from "../../clasesColecciones/boleta.js"
import { Movimiento } from "../../clasesColecciones/movimiento.js"
import { Funcion } from "../../clasesColecciones/funcion.js"
import { Cliente } from "../../clasesColecciones/cliente.js"
import { insertMovimiento } from "../gestionMovimiento/movimientoController.js"

export const insertBoleta = async (boletaParametro) => {
    let boletaInstance = new Boleta()
    let funcionInstance = new Funcion()
    let clienteInstance = new Cliente()

    let findCliente = await clienteInstance.findOneCliente({
        _id: boletaParametro.cliente_id
    })
    
    if(!findCliente) {
        return { error: "El cliente no existe en la base de datos." }
    }
    
    let findFuncion = await funcionInstance.findFuncionById({
        _id: boletaParametro.funcion_id
    })

    if(!findFuncion) {
        return { error: "La función no existe en la base de datos." }
    }

    if(!boletaParametro.asiento in findFuncion.asientos) {
        return { error: "El asiento no esta disponible." }
    }

    let res = await boletaInstance.insertBoleta({
        cliente_id: boletaParametro.cliente_id,
        funcion_id: boletaParametro.funcion_id,
        asiento: boletaParametro.asiento,
        estado_pago: boletaParametro.estado_pago
    })
    let boletaId = res.insertedId
    let findBoleta = await boletaInstance.findOneBoleta({
        _id: boletaId
    })
    console.log(findBoleta)

    let updateFuncionAsientos = await funcionInstance.updateFuncion(
        {_id: boletaParametro.funcion_id},
        {$pull: {asientos: boletaParametro.asiento}}
    )
    if(boletaParametro.estado_pago === true) {
        let insertMovimientoInmediato = await insertMovimiento({
            boleta_id: boletaId,
            monto_COP: boletaParametro.monto_COP
        })
    } else if(boletaParametro.estado_pago === false) {
        console.log(`Acabas de reservar el asiento ${boletaParametro.asiento}, recuerda pagar la boleta antes de ingresar a la función.`)
    }
    return res
}