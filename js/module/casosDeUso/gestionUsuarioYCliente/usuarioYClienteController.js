import { ObjectId } from "mongodb";
import { Cliente } from "../../clasesColecciones/cliente.js"

export const createUsuarioYInsertCliente = async (usuarioParametro) => {
    let clienteInstance = new Cliente()


    let findCliente = await clienteInstance.findOneCliente({
        nick: usuarioParametro.nick
    })
    if(findCliente) {
        return { mensaje: "El usuario ya existe" }
    }

    let userRoleReadOrWrite = "read"
    let userRoleTipo = "Usuario"
    if(usuarioParametro.tipo === "Estandar") {
        userRoleTipo = "usuarioEstandar"
    } else if(usuarioParametro.tipo === "VIP") {
        userRoleTipo = "usuarioVIP"
    } else if(usuarioParametro.tipo === "Admin") {
        userRoleReadOrWrite = "readWrite"
        userRoleTipo = "Administrador"
    } else {
        return { error: "El tipo de usuario no es valido." }
    }

    let createUsuario = await clienteInstance.createUsuario({
        createUser: usuarioParametro.nick,
        pwd: usuarioParametro.pwd,
        roles: [
            { role: userRoleReadOrWrite, db: "cineCampus" },
            { role: userRoleTipo, db: "cineCampus" }
        ]
    })
    let insertCliente = await clienteInstance.insertCliente(usuarioParametro)
    let clienteId = res.insertedId
    findCliente = await clienteInstance.findOneCliente({_id: clienteId})
    console.log(findCliente)
    console.log(insertCliente)
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