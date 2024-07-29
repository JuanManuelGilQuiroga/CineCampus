import { ObjectId } from "mongodb";
import { Movimiento } from "../../clasesColecciones/movimiento.js";
import { Boleta } from "../../clasesColecciones/boleta.js";
import { Cliente } from "../../clasesColecciones/cliente.js";
import { Funcion } from "../../clasesColecciones/funcion.js";

export const insertMovimiento = async (movimientoParametro) => {
    let movimientoInstance = new Movimiento()
    let boletaInstance = new Boleta()
    let clienteInstance = new Cliente()
    let funcionInstance = new Funcion()

    let findMovimiento = await movimientoInstance.findOneMovimiento({
        boleta_id: movimientoParametro.boleta_id
    })
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

    let precioBoletaVIP = findFuncion.precio_COP*0.80
    if(findCliente.tipo == "VIP" && movimientoParametro.monto_COP != precioBoletaVIP) {
        return { error: "El monto de la boleta no coincide con el monto del cliente. Recuerde que por ser cliente VIP tiene un descuento del 20%." }
    } else if(movimientoParametro.monto_COP != findFuncion.precio_COP) {
        return { error: "El monto de la boleta no coincide con el monto del cliente." }
    }

    let res = await movimientoInstance.insertMovimiento(movimientoParametro)
    let movimientoId = res.insertedId
    findMovimiento = await movimientoInstance.findOneMovimiento({
        _id: movimientoId
    })
    console.log(findMovimiento)

    let updateBoletaEstadoPago = await boletaInstance.updateBoleta(
        {_id: movimientoParametro.boleta_id},
        {$set: {estado_pago: true}}
    )

    return res
}