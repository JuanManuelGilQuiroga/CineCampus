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