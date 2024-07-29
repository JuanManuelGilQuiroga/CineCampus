import { createUsuarioYInsertCliente, listarClientes } from "./usuarioYClienteController.js"


let usuarioInsert = {
    nombre: "Juan",
    apellido: "Gil",
    nick: "juanMGQ",
    pwd: "jmgqEstandar",
    email: "jmgq2007@gmail.com",
    telefono: "315 6431235",
    tipo: "Estandar"
}

let clientesBuscar = "Estandar"

//console.log(await createUsuarioYInsertCliente(usuarioInsert))

console.log(await listarClientes(clientesBuscar))