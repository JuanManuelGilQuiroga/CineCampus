const { ObjectId } = require('mongodb');
const Funcion = require('../model/funcion.model.cjs');
const { insertMovimiento } = require('./movimiento.controller.cjs');
const Cliente = require('../model/usuario.model.cjs');
const Boleta = require('../model/boleta.model.cjs');
const { validationResult } = require('express-validator');
const BoletaDTO = require('../dto/boleta.dto.cjs');
const FuncionDTO = require('../dto/funcion.dto.cjs');
const UsuarioDTO = require('../dto/usuario.dto.cjs');
const MovimientoDTO = require('../dto/movimiento.dto.cjs');
const Movimiento = require('../model/movimiento.model.cjs');

/**
 * Inserta una nueva boleta en la base de datos.
 * @param {Object} boletaParametro - El objeto que contiene los detalles de la boleta a insertar
 * @property {ObjectId} cliente_id - El ID del cliente.
 * @property {ObjectId} funcion_id - El ID de la función.
 * @property {string} asiento - El asiento reservado.
 * @property {boolean} estado_pago - Estado del pago de la boleta.
 * @property {number} monto_COP - Monto en COP de la boleta.
 
 * @returns {Promise<Object>} Una promesa que resuelve con el resultado de la inserción.
 */
const insertBoleta = async (boletaParametro) => {
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

    let aggregateBoletaInfo = await boletaInstance.aggregateBoleta([
        {
            $lookup: {
            from: "funcion",
            localField: "funcion_id",
            foreignField: "_id",
            as: "funcion_info",
            },
        },
        {
            $unwind: "$funcion_info",
        },
        {
            $lookup: {
            from: "pelicula",
            localField: "funcion_info.pelicula_id",
            foreignField: "_id",
            as: "pelicula_info",
            },
        },
        {
            $unwind: "$pelicula_info",
        },
        {
            $lookup: {
            from: "sala",
            localField: "funcion_info.sala_id",
            foreignField: "_id",
            as: "sala_info",
            },
        },
        {
            $unwind: "$sala_info",
        },
        {
            $project: {
            asiento: 1,
            funcion: "$funcion_info.fecha_hora_inicio",
            pelicula: "$pelicula_info.titulo",
            sala: "$sala_info.nombre",
            },
        }
    ])

    let fechaFuncion = aggregateBoletaInfo.funcion.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false })


    // Actualizar la función para remover el asiento reservado
    let updateFuncionAsientos = await funcionInstance.updateFuncion(
        {_id: boletaParametro.funcion_id},
        {$pull: {asientos: boletaParametro.asiento}}
    )
    // Insertar movimiento si el pago fue realizado
    if(boletaParametro.estado_pago == true) {
        let insertMovimientoInmediato = await insertMovimiento({
            boleta_id: boletaId,
            monto_COP: boletaParametro.monto_COP
        })
        if(insertMovimientoInmediato.error) {
            let cambiarEstadoPago = await boletaInstance.updateBoleta(
                {_id: boletaId},
                {$set: {estado_pago: false}}
            )
            return insertMovimientoInmediato
        }
        console.log(insertMovimientoInmediato)
    } else if(boletaParametro.estado_pago == false) {
        res.mensaje = `Acabas de reservar el asiento ${boletaParametro.asiento} de la funcion de "${aggregateBoletaInfo.pelicula}" en la ${aggregateBoletaInfo.sala} a las ${fechaFuncion}, recuerda pagar la boleta antes de ingresar a la función.`
        return res
    }
    return res
}

/**
 * Elimina una boleta en la base de datos.
 * @param {ObjectId} boletaParametro - El objeto que contiene el ObjectId de la boleta que se desea eliminar
 * @returns {Promise<Object>} Una promesa que resuelve con el resultado de la eliminación.
 */
const deleteReserva = async (boletaParametro) => {
    let funcionInstance = new Funcion()
    let boletaInstance = new Boleta()
    let clienteInstance = new Cliente()
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
    
    //validar si el cliente es el que hizo la reserva
    let findCliente = await clienteInstance.findOneCliente({
        _id: findReserva.cliente_id
    })
    if(findCliente.nick != process.env.MONGO_USER) {
        return { error: "Sus credenciales no son validas para cancelar una reserva a nombre de este cliente." }
    }

    let aggregateBoletaInfo = await boletaInstance.aggregateBoleta([
        {
            $match: {
                asiento: findReserva.asiento
            }
        },
        {
            $lookup: {
            from: "funcion",
            localField: "funcion_id",
            foreignField: "_id",
            as: "funcion_info",
            },
        },
        {
            $unwind: "$funcion_info",
        },
        {
            $lookup: {
            from: "pelicula",
            localField: "funcion_info.pelicula_id",
            foreignField: "_id",
            as: "pelicula_info",
            },
        },
        {
            $unwind: "$pelicula_info",
        },
        {
            $lookup: {
            from: "sala",
            localField: "funcion_info.sala_id",
            foreignField: "_id",
            as: "sala_info",
            },
        },
        {
            $unwind: "$sala_info",
        },
        {
            $project: {
            asiento: 1,
            funcion: "$funcion_info.fecha_hora_inicio",
            pelicula: "$pelicula_info.titulo",
            sala: "$sala_info.nombre",
            },
        }
    ])
    console.log(aggregateBoletaInfo)

    let fechaFuncion = aggregateBoletaInfo.funcion.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false })

    //Eliminar la boleta si no estaba pagada
    let res = await boletaInstance.deleteBoleta({
        _id: boletaParametro
    })

    let updateAsientoFuncion = await funcionInstance.updateFuncion(
        {_id: findReserva.funcion_id},
        {$push: {asientos: findReserva.asiento}}
    )
    res.id = findReserva._id
    res.mensaje = `Se ha cancelado la reserva para el asiento ${findReserva.asiento} de la funcion de "${aggregateBoletaInfo.pelicula}" en la ${aggregateBoletaInfo.sala} a las ${fechaFuncion}.`
    return res
}

module.exports = { insertBoleta, deleteReserva }