import { Cliente } from "../../clasesColecciones/cliente.js";
import { insertTarjeta } from "../gestionTarjeta/tarjetaController.js";

/**
 * Crea un nuevo usuario en la base de datos y lo inserta en la colección de clientes.
 * 
 * @param {Object} usuarioParametro - El objeto que contiene los detalles del usuario a crear.
 * @returns {Promise<Object>} Una promesa que resuelve con el resultado de la creación del usuario y la insercion del cliente o un mensaje de error si se identifica alguno.
 */
export const createUsuarioYInsertCliente = async (usuarioParametro) => {
    let clienteInstance = new Cliente()

    // Verificar si el usuario ya existe
    let findCliente = await clienteInstance.findOneCliente({
        nick: usuarioParametro.nick
    })
    if(findCliente) {
        return { mensaje: "El usuario ya existe" }
    }

    // Asignar el rol correspondiente según el tipo de usuario
    let userRoleTipo = "Usuario"
    if(usuarioParametro.tipo === "Estandar") {
        userRoleTipo = "usuarioEstandar"
    } else if(usuarioParametro.tipo === "VIP") {
        userRoleTipo = "usuarioVIP"
    } else {
        return { error: "El tipo de usuario no es valido." }
    }

    // Crear el usuario en la base de datos
    let createUsuario = await clienteInstance.commandUsuario({
        createUser: usuarioParametro.nick,
        pwd: usuarioParametro.pwd,
        roles: [
            { role: "read", db: process.env.MONGO_DB },
            { role: userRoleTipo, db: process.env.MONGO_DB },
            { role: "dbAdmin", db: process.env.MONGO_DB }
        ]
    })

    // Insertar el cliente en la colección de clientes
    let res = await clienteInstance.insertCliente({
        nombre: usuarioParametro.nombre,
        apellido: usuarioParametro.apellido,
        nick: usuarioParametro.nick,
        email: usuarioParametro.email,
        telefono: usuarioParametro.telefono,
        tipo: usuarioParametro.tipo
    })
    
    // Obtener el ID del cliente recién insertado
    let clienteId = res.insertedId
    findCliente = await clienteInstance.findOneCliente({_id: clienteId})
    console.log(findCliente)
    console.log(res)

    // Insertar una tarjeta para el cliente si es VIP
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

export const findOneCliente = async (clienteNick) => {
    let clienteInstance = new Cliente()
    let findCliente = await clienteInstance.findOneCliente({
        nick: clienteNick
    })
    if(!findCliente) {
        return { error: "El cliente no existe en la base de datos." }
    }

    if(process.env.MONGO_USER != clienteNick && process.env.MONGO_USER != "admin") {
        return { error: "Sus credenciales no son validas para adquirir la informacion de este cliente." }
    }

    let detallesCliente = await clienteInstance.aggregateCliente([
        { $match: { nick: clienteNick } },
        { $lookup: { from: "tarjeta", localField: "_id", foreignField: "cliente_id", as: "tarjeta" } },
        { $unwind: "$tarjeta"},
        { $replaceRoot: { newRoot: { $mergeObjects: ["$tarjeta", "$$ROOT"]}}},
        { $project: { nombre: 1, apellido: 1, nick: 1, email: 1, telefono: 1, tipo: 1, numero_tarjeta: "$numero", } }
    ])
    return detallesCliente
}