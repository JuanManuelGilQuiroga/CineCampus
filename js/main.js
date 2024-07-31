import { ObjectId } from "mongodb";
import { insertBoleta, deleteReserva } from "./module/casosDeUso/gestionBoleta/boletaController.js";
import { insertFuncion, verificarDisponibilidadAsientos } from "./module/casosDeUso/gestionFuncion/funcionController.js";
import { insertMovimiento } from "./module/casosDeUso/gestionMovimiento/movimientoController.js";
import { insertPelicula, listarPeliculas, detallesPelicula } from "./module/casosDeUso/gestionPelicula/peliculaController.js";
import { insertSala } from "./module/casosDeUso/gestionSala/salaController.js";
import { insertTarjeta, deleteTarjeta } from "./module/casosDeUso/gestionTarjeta/tarjetaController.js";
import { createUsuarioYInsertCliente, findOneCliente, listarClientes } from "./module/casosDeUso/gestionUsuarioYCliente/usuarioYClienteController.js";


/**
 * Objeto que contiene los detalles de la boleta a insertar.
 * @type {Object}
 * @property {ObjectId} cliente_id - El ID del cliente.
 * @property {ObjectId} funcion_id - El ID de la función.
 * @property {string} asiento - El asiento reservado.
 * @property {boolean} estado_pago - Estado del pago de la boleta.
 * @property {number} monto_COP - Monto en COP de la boleta.
 */
// let boletaDetalle = {
//     cliente_id: new ObjectId('66a95397fca48b17e521f208'),
//     funcion_id: new ObjectId('66a743091a52555cff546d3b'),
//     asiento: "A2",
//     estado_pago: false,
//     monto_COP: 7000
// }

// Llamada a la función insertBoleta con el objeto boletaDetalle y salida del resultado.
//console.log(await insertBoleta(boletaDetalle))

/**
 * Objeto que contiene los detalles de la boleta a insertar.
 * @type {ObjectId} ObjectId de la boleta que se desea eliminar
 */
//let boletaId = new ObjectId('66a9e21b5519d848d1e5dc3b')


// Llamada a la función deleteReserva con el objeto boletaId y salida del resultado
//console.log(await deleteReserva(boletaId))


//════════════════════════════════════════════════════════════════════════


/**
 * Parámetros de la función a insertar.
 * @type {Object}
 * @property {ObjectId} pelicula_id - El ID de la película asociada a la función.
 * @property {ObjectId} sala_id - El ID de la sala donde se proyectará la película.
 * @property {Date} fecha_hora_inicio - La fecha y hora de inicio de la función.
 * @property {Date} fecha_hora_final - La fecha y hora de finalización de la función.
 * @property {number} precio_COP - El precio en COP de la función.
 */
// let funcionInsertar = {
//     pelicula_id: new ObjectId('66a597b03d45ef35a8b018ac'),
//     sala_id: new ObjectId('66a58fab8a7ddb4b6799c27a'),
//     fecha_hora_inicio: new Date('2024-07-25T21:30:00.000+00:00'),
//     fecha_hora_final: new Date('2024-07-25T23:17:00.000+00:00'),
//     precio_COP: 7000
// }

/**
 * @type {ObjectId} funcionId - El id de la funcion que se quiere buscar
 */
//let funcionId = new ObjectId('66a743091a52555cff546d3b')
// Llama a la función para insertar la función y muestra el resultado
//console.log(await insertFuncion(funcionInsertar))

//Llama a la función para verificar la disponibilidad de los asientos para la función
//console.log(await verificarDisponibilidadAsientos(funcionId))


//════════════════════════════════════════════════════════════════════════


/**
 * Parámetros de la función a insertar.
 * @type {Object}
 * @property {ObjectId} boleta_id - El ID de la boleta asociada al movimiento.
 * @property {int} monto_COP - El monto a pagar
 */
// let movimientoInsertar = {
//     boleta_id: new ObjectId('66a95ceeff645c6c26929794'),
//     monto_COP: 5600
// }

//Inserta un movimiento
//console.log(await insertMovimiento(movimientoInsertar))


//════════════════════════════════════════════════════════════════════════


/**
 * Objeto que representa una película a insertar en la base de datos.
 * @type {Object}
 * @property {string} titulo - El título de la película.
 * @property {string} genero - El género de la película.
 * @property {number} duracion_m - La duración de la película en minutos.
 * @property {string} sinopsis - La sinopsis de la película.
 * @property {Date} estreno - La fecha de estreno de la película en cartelera.
 * @property {Date} retiro - La fecha de retiro de la película de cartelera.
 */
// let peliculaInsertar = {
//     titulo: "Whiplash: música y obsesión",
//     genero: "Drama",
//     duracion_m: 107,
//     sinopsis: "Andrew Neiman es un joven y ambicioso baterista de jazz. Marcado por el fracaso de la carrera literaria de su padre, está obsesionado con alcanzar la cima dentro del elitista conservatorio de música de la Costa Este en el que estudia.",
//     estreno: new Date("2024-07-25"),
//     retiro: new Date("2024-09-25")
// }

/**
 * ObjetoId de la película específica que se usará para buscar detalles.
 * @type {ObjectId}
 */
//let peliculaId = new ObjectId('66a597b03d45ef35a8b018ac')

// Inserta una nueva película en la base de datos
//console.log(await insertPelicula(peliculaInsertar))

// Lista todas las películas con detalles sobre sus funciones
//console.log(await listarPeliculas())

// Obtiene los detalles de una película específica por ID
//console.log(await detallesPelicula(peliculaId))


//════════════════════════════════════════════════════════════════════════


/**
 * Parámetros de la función a insertar.
 * @type {Object}
 * @property {string} nombre - El nombre de la sala.
 * @property {array} asientos - Los asientos que tiene la sala.
 */
// let salaInsertar = {
//     nombre: "Sala 2",
//     asientos: [
//         "A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10",
//         "B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10",
//         "C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10",
//         "D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "D10",
//         "E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9", "E10",
//         "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10",
//         "G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9", "G10"
//     ]
// }

// Inserta una nueva sala en la base de datos
//console.log(await insertSala(salaInsertar))


//════════════════════════════════════════════════════════════════════════


/**
 * Objeto que representa una película a insertar en la base de datos.
 * @type {Object}
 * @property {ObjectId} cliente_id - El id del cliente.
 * @property {string} numero - El numero de tarjeta VIP del cliente.
 */
// let tarjetaInsertar = {
//     cliente_id: new ObjectId('66a908fc4d67f3146f6ea2ef'),
//     numero: "1234 5678 9012 3456"
// }

//inserta una nueva tarjeta VIP
//console.log(await insertTarjeta(tarjetaInsertar))

/**
 * String que representa la tarjeta que se desea eliminar
 * @type {String} - Numero de tarjeta
 */
//let tarjetaEliminar = "1234 5678 9012 3456"

//elimina una tarjeta
//console.log(await deleteTarjeta(tarjetaEliminar))


//════════════════════════════════════════════════════════════════════════


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
// let usuarioInsert = {
//     nombre: "Juan",
//     apellido: "Gil",
//     nick: "juanMGQ",
//     pwd: "jmgqEstandar",
//     email: "jmgq2007@gmail.com",
//     telefono: "315 6431235",
//     tipo: "Estandar",
//     numero_tarjeta: "1234 5678 9012 3456"
// }

//Crea un nuevo usuario
//console.log(await createUsuarioYInsertCliente(usuarioInsert))

/**
 * Tipo de usuario a buscar
 * @type {String} Tipo de usuario
 */
//let clientesBuscar = "VIP"
//Llama a la funcion para pasar el parametro del tipo de usuario y espera respuesta
//console.log(await listarClientes(clientesBuscar))

//let clienteNick = "juanMGQ"

//Llama a la funcion para pasar el parametro del usuario que se quiere buscar
//console.log(await findOneCliente(clienteNick))