const { validationResult } = require('express-validator');
const TarjetaDTO = require('../dto/tarjeta.dto')
const UsuarioDTO = require('../dto/usuario.dto')
const Tarjeta = require('../model/tarjeta.model');
const Cliente = require('../model/usuario.model')

/**
 * Inserta una nueva tarjeta para un cliente en la colección de tarjetas.
 * @param {Object} tarjetaParametro - El objeto que contiene los detalles de la tarjeta a insertar
 * @property {ObjectId} cliente_id - El id del cliente.
 * @property {string} numero - El numero de tarjeta VIP del cliente.
 *
 * @returns {Promise<Object>} Una promesa que resuelve con el resultado de la inserción de la tarjeta.
 */
const insertTarjeta = async (tarjetaParametro) => {
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

    let findUsuario = await clienteInstance.findOneCliente({
        nick: process.env.MONGO_USER
    })

    // Manejo de credenciales y roles
    if(findUsuario.tipo != "Admin") {
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

    if(findUsuario.tipo == "Admin" && findCliente.tipo == "Estandar") {
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
    } else if(findCliente.tipo == "VIP") {
        return { error: "Usted ya cuenta con una tarjeta VIP." }
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
const deleteTarjeta = async (numeroTarjeta) => {
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

    let findUsuario = await clienteInstance.findOneCliente({
        nick: process.env.MONGO_USER
    })

     // Manejo de credenciales y roles
    if(findUsuario.tipo != "Admin") {
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
        } else if(findCliente.tipo != "VIP") {
            return { error: "Usted no cuenta con una tarjeta VIP." }
        }
    }

    if(findUsuario.tipo == "Admin" && findCliente.tipo == "VIP") {
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
    } else if(findCliente.tipo != "VIP") {
        return { error: "Usted no cuenta con una tarjeta VIP." }
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
    res.mensaje = `La tarjeta con numero ${numeroTarjeta} ha sido borrada de la base de datos.`
    return res
}

//-----------------------------------------------------------------------------------------------------------------------------

const crearTarjeta = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({errors: errors.array()});
    const tarjetaDTO = new TarjetaDTO();
    const usuarioDTO = new UsuarioDTO();
    const objTarjeta = new Tarjeta();
    const objCliente = new Cliente();
    let data = tarjetaDTO.usuarioIdToIdKey(req.body);
    let resModel = await objCliente.findOneClienteById(data);
    data = (resModel) ? usuarioDTO.templateExistUser(resModel) : usuarioDTO.templateNotUsers();
    console.log(data)
    if(data.status == 404) res.status(data.status).json(data);
    let usuario = resModel
    if(data.status == 200) resModel = await objTarjeta.findOneTarjetaByNumber(req.body);
    data = (resModel) ? tarjetaDTO.templateExistCard(resModel) : tarjetaDTO.templateNotCards();
    if(data.status == 200) res.status(data.status).json(data);
    if(data.status == 404) {var mongoUser = usuarioDTO.mongoUserToObject(process.env.MONGO_USER);}
    resModel = await objCliente.findOneClienteByNickOrEmail(mongoUser);
    if(resModel.tipo != "Admin"){
        data = (process.env.MONGO_USER != usuario.nick) ? tarjetaDTO.templateBadCredentials() : tarjetaDTO.templateContinue();
        if(data.status == 401) res.status(data.status).json(data);
    }
    data = (usuario.tipo == "Estandar") ? tarjetaDTO.templateContinue() : usuarioDTO.templateBadRequest();
    if(data.status == 400) res.status(data.status).json(data);
    if(data.status == 100) {
        usuario = usuarioDTO.typeToRole(usuario);
        var newUsuario = usuarioDTO.changeRole(usuario);
    }
    resModel = await objCliente.revokeRolesFromUsuario(usuario);
    data = (resModel.ok) ? usuarioDTO.templateExistUser(resModel) : usuarioDTO.templateUserError(resModel);
    if(data.status == 500) res.status(data.status).json(data);
    if(data.status == 200) resModel = await objCliente.grantRolesToUsuario(newUsuario)
    data = (resModel.ok) ? usuarioDTO.templateExistUser(resModel) : usuarioDTO.templateUserError(resModel)
    if(data.status == 500) res.status(data.status).json(data);
    if(data.status == 200) newUsuario = usuarioDTO.roleToType(newUsuario);
    resModel = await objCliente.updateCliente(newUsuario);
    data = (resModel.modifiedCount) ? usuarioDTO.templateExistUser(resModel) : usuarioDTO.templateUserError(resModel);
    if(data.status == 500) res.status(data.status).json(data);
    if(data.status == 200) resModel = await objTarjeta.insertTarjeta(req.body);
    data = (resModel.acknowledged) ? tarjetaDTO.templateTarjetaSaved(req.body) : tarjetaDTO.templateTarjetaError(resModel);
    if(data.status == 500) res.status(data.status).json(data);
    res.status(data.status).json(data);
}




module.exports = {
    insertTarjeta,
    deleteTarjeta,
    crearTarjeta
}