import { ObjectId } from "mongodb";
import { insertBoleta, deleteReserva } from "./module/boleta/boleta.controller.js";
import { insertFuncion, verificarDisponibilidadAsientos } from "./module/funcion/funcion.controller.js";
import { insertMovimiento } from "./module/movimiento/movimiento.controller.js";
import { insertPelicula, listarPeliculas, detallesPelicula } from "./module/pelicula/pelicula.controller.js";
import { insertSala } from "./module/sala/sala.controller.js";
import { insertTarjeta, deleteTarjeta } from "./module/tarjeta/tarjeta.controller.js";
import { createUsuarioYInsertCliente, findOneCliente, listarClientes } from "./module/usuario/usuario.controller.js";