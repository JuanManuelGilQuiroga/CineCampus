const { ObjectId } = require('mongodb');
const { insertBoleta, deleteReserva } = require('./module/boleta/boleta.controller');
const { insertFuncion, verificarDisponibilidadAsientos } = require('./module/funcion/funcion.controller');
const { insertMovimiento } = require('./module/movimiento/movimiento.controller');
const { insertPelicula, listarPeliculas, detallesPelicula } = require('./module/pelicula/pelicula.controller');
const { insertSala } = require('./module/sala/sala.controller');
const { insertTarjeta, deleteTarjeta } = require('./module/tarjeta/tarjeta.controller');
const { createUsuarioYInsertCliente, findOneCliente, listarClientes } = require('./module/usuario/usuario.controller');