import { Tarjeta } from "../../clasesColecciones/tarjeta.js"
import { Cliente } from "../../clasesColecciones/cliente.js"

export const insertTarjeta = async (tarjetaParametro) => {
    let tarjetaInstance = new Tarjeta()
    let clienteInstance = new Cliente()
    let findTarjeta = await tarjetaInstance.findOneTarjeta({
        cliente_id: tarjetaParametro.cliente_id,
        numero: tarjetaParametro.numero
    })

    let findCliente = await clienteInstance.findOneCliente({
        _id: tarjetaParametro.cliente_id
    })
    if(!findCliente) {
        return { error: "El cliente no existe." }
    }

    if(findTarjeta) {
        return { error: "La tarjeta ya existe." }
    }

    if(process.env.MONGO_USER != "admin") {
        if(process.env.MONGO_USER != findCliente.nick) {
            return { error: "Sus credenciales no son validas para adquirir una tarjeta VIP a nombre de este cliente." }
        }

        if(findCliente.tipo == "Estandar") {
            let revokeRolesFromUsuario = await clienteInstance.commandUsuario({
                revokeRolesFromUser: process.env.MONGO_USER,
                roles: [
                    { role: 'usuarioEstandar', db: process.env.MONGO_DB }
                ]
            })

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

    let res = await tarjetaInstance.insertTarjeta(tarjetaParametro)
    let tarjetaId = res.insertedId

    findTarjeta = await tarjetaInstance.findOneTarjeta({
        _id: tarjetaId
    })
    console.log(findTarjeta)
    return res
}