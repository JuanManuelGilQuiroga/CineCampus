import { Tarjeta } from "../../clasesColecciones/tarjeta.js"
import { Cliente } from "../../clasesColecciones/cliente.js"

/**
 * Inserta una nueva tarjeta para un cliente en la colección de tarjetas.
 * @param {Object} tarjetaParametro - El objeto que contiene los detalles de la tarjeta a insertar
 * @returns {Promise<Object>} Una promesa que resuelve con el resultado de la inserción de la tarjeta.
 */
export const insertTarjeta = async (tarjetaParametro) => {
    let tarjetaInstance = new Tarjeta()
    let clienteInstance = new Cliente()

    // Verificar si la tarjeta ya existe para el cliente
    let findTarjeta = await tarjetaInstance.findOneTarjeta({
        numero: tarjetaParametro.numero
    })

     // Verificar si el cliente existe
    let findCliente = await clienteInstance.findOneCliente({
        _id: tarjetaParametro.cliente_id
    })
    if(!findCliente) {
        return { error: "El cliente no existe." }
    }

    // Verificar si la tarjeta ya existe
    if(findTarjeta) {
        return { error: "La tarjeta ya existe." }
    }

    // Manejo de credenciales y roles
    if(process.env.MONGO_USER != "admin") {
        if(process.env.MONGO_USER != findCliente.nick) {
            return { error: "Sus credenciales no son validas para adquirir una tarjeta VIP a nombre de este cliente." }
        }

        if(findCliente.tipo == "Estandar") {
            // Revocar rol de usuario estándar
            let revokeRolesFromUsuario = await clienteInstance.commandUsuario({
                revokeRolesFromUser: process.env.MONGO_USER,
                roles: [
                    { role: 'usuarioEstandar', db: process.env.MONGO_DB }
                ]
            })

            // Otorgar rol de usuario VIP
            let grantRolesToUsuario = await clienteInstance.commandUsuario({
                grantRolesToUser: process.env.MONGO_USER,
                roles: [
                    { role: 'usuarioVIP', db: process.env.MONGO_DB }
                ]
            })
        } else if(findCliente.tipo == "VIP") {
            return { error: "Usted ya cuenta con una tarjeta VIP." }
        }
    }

    if(process.env.MONGO_USER == "admin" && findCliente.tipo == "Estandar") {
        // Revocar rol de usuario estándar
        let revokeRolesFromUsuario = await clienteInstance.commandUsuario({
            revokeRolesFromUser: findCliente.nick,
            roles: [
                { role: 'usuarioEstandar', db: process.env.MONGO_DB }
            ]
        })

        // Otorgar rol de usuario VIP
        let grantRolesToUsuario = await clienteInstance.commandUsuario({
            grantRolesToUser: findCliente.nick,
            roles: [
                { role: 'usuarioVIP', db: process.env.MONGO_DB }
            ]
        })
    }

    // Insertar la tarjeta en la colección
    let res = await tarjetaInstance.insertTarjeta(tarjetaParametro)
    let tarjetaId = res.insertedId

    // Buscar la tarjeta insertada
    findTarjeta = await tarjetaInstance.findOneTarjeta({
        _id: tarjetaId
    })

    // Actualizar el tipo de cliente a "VIP"
    let updateClienteTipo = await clienteInstance.updateCliente(
        { _id: findTarjeta.cliente_id },
        {$set: {tipo: "VIP"}}
    )
    console.log(findTarjeta)
    return res
}

/**
 * Elimina una tarjeta de la colección de tarjetas.
 * @param {string} numeroTarjeta - El número de la tarjeta que se va a eliminar.
 * @returns {Promise<Object>} Una promesa que resuelve con el resultado de la eliminación de la tarjeta.
 */
export const deleteTarjeta = async (numeroTarjeta) => {
    let tarjetaInstance = new Tarjeta()
    let clienteInstance = new Cliente()

    // Verificar si la tarjeta existe
    let findTarjeta = await tarjetaInstance.findOneTarjeta({
        numero: numeroTarjeta
    })
    if(!findTarjeta) {
        return { error: "La tarjeta no existe." }
    }

    // Verificar si el cliente asociado a la tarjeta existe
    let findCliente = await clienteInstance.findOneCliente({
        _id: findTarjeta.cliente_id
    })

     // Manejo de credenciales y roles
    if(process.env.MONGO_USER != "admin") {
        if(process.env.MONGO_USER != findCliente.nick) {
            return { error: "Sus credenciales no son validas para eliminar una tarjeta VIP a nombre de este cliente." }
        }

        if(findCliente.tipo == "VIP") {
            // Revocar rol de usuario VIP
            let revokeRolesFromUsuario = await clienteInstance.commandUsuario({
                revokeRolesFromUser: process.env.MONGO_USER,
                roles: [
                    { role: 'usuarioVIP', db: process.env.MONGO_DB }
                ]
            })

            // Otorgar rol de usuario estandar
            let grantRolesToUsuario = await clienteInstance.commandUsuario({
                grantRolesToUser: process.env.MONGO_USER,
                roles: [
                    { role: 'usuarioEstandar', db: process.env.MONGO_DB }
                ]
            })
        }
    }

    if(process.env.MONGO_USER == "admin" && findCliente.tipo == "VIP") {
        // Revocar rol de usuario VIP
        let revokeRolesFromUsuario = await clienteInstance.commandUsuario({
            revokeRolesFromUser: findCliente.nick,
            roles: [
                { role: 'usuarioVIP', db: process.env.MONGO_DB }
            ]
        })

        // Otorgar rol de usuario estandar
        let grantRolesToUsuario = await clienteInstance.commandUsuario({
            grantRolesToUser: findCliente.nick,
            roles: [
                { role: 'usuarioEstandar', db: process.env.MONGO_DB }
            ]
        })
    }

    // Eliminar la tarjeta de la colección
    let res = await tarjetaInstance.deleteTarjeta({
        numero: numeroTarjeta
    })

    // Actualizar el tipo de cliente a "Estandar"
    let updateClienteTipo = await clienteInstance.updateCliente(
        { _id: findTarjeta.cliente_id },
        {$set: {tipo: "Estandar"}}
    )
    return res
}