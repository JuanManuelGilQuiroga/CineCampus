import { Boleta } from "../gestionBoleta/boleta.js";
import { Cliente } from "../gestionUsuarioYCliente/cliente.js";
import { Funcion } from "../gestionFuncion/funcion.js";
import { Movimiento } from "./movimiento.js";

/**
 * Inserta un movimiento de pago en la base de datos.
 * @param {Object} movimientoParametro - Objeto que contiene los detalles del movimiento a insertar.
 * @property {ObjectId} boleta_id - El ID de la boleta asociada al movimiento.
 * @property {int} monto_COP - El monto a pagar
 *
 * @returns {Promise<Object>} Una promesa que resuelve con el resultado de la inserción.
 */
export const insertMovimiento = async (movimientoParametro) => {
    let movimientoInstance = new Movimiento()
    let boletaInstance = new Boleta()
    let clienteInstance = new Cliente()
    let funcionInstance = new Funcion()

    // Busca si ya existe un movimiento asociado a la boleta
    let findMovimiento = await movimientoInstance.findOneMovimiento({
        boleta_id: movimientoParametro.boleta_id
    })
    // Busca la boleta asociada al movimiento
    let findBoleta = await boletaInstance.findOneBoleta({
        _id: movimientoParametro.boleta_id
    })
    if(!findBoleta) {
        return { error: "La boleta no existe en la base de datos." }
    } else if(findMovimiento) {
        return { error: "La boleta ya esta paga." }
    }

    let findCliente = await clienteInstance.findOneCliente({
        _id: findBoleta.cliente_id
    })
    let findFuncion = await funcionInstance.findFuncionById({
        _id: findBoleta.funcion_id
    })

    // Verifica que el monto del movimiento coincida con el precio esperado para clientes VIP
    let precioBoletaVIP = findFuncion.precio_COP*0.80
    if(findCliente.tipo == "VIP" && movimientoParametro.monto_COP != precioBoletaVIP) {
        return { error: "El monto de la boleta no coincide con el monto del cliente. Recuerde que por ser cliente VIP tiene un descuento del 20%. Dirijase a pagar la boleta directamente." }
    } else if(findCliente.tipo == "Estandar" && movimientoParametro.monto_COP != findFuncion.precio_COP) {
        return { error: "El monto de la boleta no coincide con el monto del cliente. Dirijase a pagar la boleta directamente." }
    }

    // Inserta el movimiento en la base de datos
    let res = await movimientoInstance.insertMovimiento(movimientoParametro)
    let movimientoId = res.insertedId
    findMovimiento = await movimientoInstance.findOneMovimiento({
        _id: movimientoId
    })
    console.log(findMovimiento)

    // Actualiza el estado de pago de la boleta
    let updateBoletaEstadoPago = await boletaInstance.updateBoleta(
        {_id: movimientoParametro.boleta_id},
        {$set: {estado_pago: true}}
    )

    return res
}