import { ObjectId } from "mongodb"
import {Boleta} from "../../clasesColecciones/boleta.js"
import { Movimiento } from "../../clasesColecciones/movimiento.js"
import { Funcion } from "../../clasesColecciones/funcion.js"
import { Cliente } from "../../clasesColecciones/cliente.js"
import { insertMovimiento } from "../gestionMovimiento/movimientoController.js"

/**
 * Inserta una nueva boleta en la base de datos.
 * @param {Object} boletaParametro - El objeto que contiene los detalles de la boleta a insertar
 * @returns {Promise<Object>} Una promesa que resuelve con el resultado de la inserción.
 */
export const insertBoleta = async (boletaParametro) => {
    let boletaInstance = new Boleta()
    let funcionInstance = new Funcion()
    let clienteInstance = new Cliente()

     // Verificar si el cliente existe
    let findCliente = await clienteInstance.findOneCliente({
        _id: boletaParametro.cliente_id
    })
    if(!findCliente) {
        return { error: "El cliente no existe en la base de datos." }
    }
    
    // Verificar si la función existe
    let findFuncion = await funcionInstance.findFuncionById({
        _id: boletaParametro.funcion_id
    })
    if(!findFuncion) {
        return { error: "La función no existe en la base de datos." }
    }

    // Verificar si el asiento está disponible
    let disponibilityAsiento = findFuncion.asientos.includes(boletaParametro.asiento)
    if(disponibilityAsiento == false) {
        return { error: "El asiento no esta disponible." }
    }

    if(process.env.MONGO_USER != findCliente.nick) {
        return { error: "Sus credenciales no son validas para apartar/comprar una boleta a nombre de este cliente." }
    }

    // Insertar la boleta en la base de datos
    let res = await boletaInstance.insertBoleta({
        cliente_id: boletaParametro.cliente_id,
        funcion_id: boletaParametro.funcion_id,
        asiento: boletaParametro.asiento,
        estado_pago: boletaParametro.estado_pago
    })

     // Buscar la boleta recién insertada
    let boletaId = res.insertedId
    let findBoleta = await boletaInstance.findOneBoleta({
        _id: boletaId
    })
    console.log(findBoleta)

    // Actualizar la función para remover el asiento reservado
    let updateFuncionAsientos = await funcionInstance.updateFuncion(
        {_id: boletaParametro.funcion_id},
        {$pull: {asientos: boletaParametro.asiento}}
    )

    // Insertar movimiento si el pago fue realizado
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

/**
 * Elimina una boleta en la base de datos.
 * @param {ObjectId} boletaParametro - El objeto que contiene el ObjectId de la boleta que se desea eliminar
 * @returns {Promise<Object>} Una promesa que resuelve con el resultado de la eliminación.
 */
export const deleteReserva = async (boletaParametro) => {
    let boletaInstance = new Boleta()
    let findReserva = await boletaInstance.findOneBoleta({
        _id: boletaParametro
    })

    //validar si la boleta existe
    if(!findReserva) {
        return { error: "La reserva no existe en la base de datos." }
    }

    //validar si la boleta esta pagada
    if(findReserva.estado_pago != false) {
        return { error: "La reserva ya fue pagada." }
    }

    //Eliminar la boleta si no estaba pagada
    let res = await boletaInstance.deleteBoleta({
        _id: boletaParametro
    })
    console.log(`Se ha cancelado la reserva para el asiento ${findReserva.asiento}`)
    return res
}