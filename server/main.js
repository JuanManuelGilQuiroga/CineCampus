const { ObjectId } = require('mongodb');
const { insertBoleta, deleteReserva } = require('./controller/boleta.controller');
const { insertFuncion, verificarDisponibilidadAsientos } = require('./controller/funcion.controller');
const { insertMovimiento } = require('./controller/movimiento.controller');
const { insertPelicula, listarPeliculas, detallesPelicula } = require('./controller/pelicula.controller');
const { insertSala } = require('./controller/sala.controller');
const { insertTarjeta, deleteTarjeta } = require('./controller/tarjeta.controller');
const { createUsuarioYInsertCliente, findOneCliente, listarClientes } = require('./controller/usuario.controller');