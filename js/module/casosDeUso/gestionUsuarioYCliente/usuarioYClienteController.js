import { ObjectId } from "mongodb";
import { Cliente } from "../../clasesColecciones/cliente.js"
import { insertTarjeta } from "../gestionTarjeta/tarjetaController.js";

export const createUsuarioYInsertCliente = async (usuarioParametro) => {
    let clienteInstance = new Cliente()


    let findCliente = await clienteInstance.findOneCliente({
        nick: usuarioParametro.nick
    })
    if(findCliente) {
        return { mensaje: "El usuario ya existe" }
    }

    let userRoleTipo = "Usuario"
    if(usuarioParametro.tipo === "Estandar") {
        userRoleTipo = "usuarioEstandar"
    } else if(usuarioParametro.tipo === "VIP") {
        userRoleTipo = "usuarioVIP"
    } else {
        return { error: "El tipo de usuario no es valido." }
    }

    let createUsuario = await clienteInstance.commandUsuario({
        createUser: usuarioParametro.nick,
        pwd: usuarioParametro.pwd,
        roles: [
            { role: "read", db: process.env.MONGO_DB },
            { role: userRoleTipo, db: process.env.MONGO_DB },
            { role: "dbAdmin", db: process.env.MONGO_DB }
        ]
    })

    let res = await clienteInstance.insertCliente({
        nombre: usuarioParametro.nombre,
        apellido: usuarioParametro.apellido,
        nick: usuarioParametro.nick,
        email: usuarioParametro.email,
        telefono: usuarioParametro.telefono,
        tipo: usuarioParametro.tipo
    })
    
    let clienteId = res.insertedId
    findCliente = await clienteInstance.findOneCliente({_id: clienteId})
    console.log(findCliente)
    console.log(res)

    if(findCliente.tipo === "VIP") {
        let insertTarjetaForCliente = await insertTarjeta({
            cliente_id: clienteId,
            numero: usuarioParametro.numero_tarjeta
        })
    }
    return createUsuario
}

/**
 * Busca los usuarios que coincidan con un tipo de usuario en la base de datos.
 * @param {String} clienteParametro - String que contiene el tipo de usuario
 * @returns {Promise<Array>} Una promesa que resuelve con el resultado de la busqueda
 */
export const listarClientes = async (clienteParametro) => {
    let clienteInstance = new Cliente()

    //Busca los usuarios que coincidan con el tipo de usuario
    let findClientes = await clienteInstance.findCliente({
        tipo: clienteParametro
    })

    //Valida si el tipo de usuario es correcto
    if(clienteParametro != "Admin" && clienteParametro != "Estandar" && clienteParametro != "VIP") {
        return { error: "El tipo de usuario no es valido." }
    }

    //valida si existen usuarios con este tipo de usuario
    if(findClientes.length == 0) {
        return { mensaje: "No hay clientes que coincidan con el tipo" }
    }
    return findClientes
}