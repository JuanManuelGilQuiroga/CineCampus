import { createUsuarioYInsertCliente, listarClientes } from "./usuarioYClienteController.js"

/**
 * Objeto que representa una película a insertar en la base de datos.
 * @type {Object}
 * @property {string} nombre - El nombre del usuario.
 * @property {string} apellido - El apellido del usuario.
 * @property {string} nick - El nick del usuario. 
 * @property {string} pwd - La contraseña del usuario.
 * @property {string} email -El e-mail del usuario.
 * @property {string} telefono - El telefono del usuario.
 * @property {string} tipo - El tipo del usuario.
 * @property {string} numero_tarjeta - El numero de tarjeta VIP del usuario.
 */
let usuarioInsert = {
    nombre: "Juan",
    apellido: "Gil",
    nick: "juanMGQ",
    pwd: "jmgqEstandar",
    email: "jmgq2007@gmail.com",
    telefono: "315 6431235",
    tipo: "Estandar",
    numero_tarjeta: "1234 5678 9012 3456"
}

//Crea un nuevo usuario
console.log(await createUsuarioYInsertCliente(usuarioInsert))

/**
 * Tipo de usuario a buscar
 * @type {String} Tipo de usuario
 */
let clientesBuscar = "Estandar"
//Llama a la funcion para pasar el parametro del tipo de usuario y espera respuesta
//console.log(await listarClientes(clientesBuscar))