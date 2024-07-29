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

/**
 * Tipo de usuario a buscar
 * @type {String} Tipo de usuario
 */
let clientesBuscar = "Estandar"

//console.log(await createUsuarioYInsertCliente(usuarioInsert))

//Llama a la funcion para pasar el parametro del tipo de usuario y espera respuesta
console.log(await listarClientes(clientesBuscar))