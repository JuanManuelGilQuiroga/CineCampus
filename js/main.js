import { ObjectId } from "mongodb";
import { insertBoleta, deleteReserva } from "./module/gestionBoleta/boletaLogica.js";
import { insertFuncion, verificarDisponibilidadAsientos } from "./module/gestionFuncion/funcionLogica.js";
import { insertMovimiento } from "./module/gestionMovimiento/movimientoLogica.js";
import { insertPelicula, listarPeliculas, detallesPelicula } from "./module/gestionPelicula/peliculaLogica.js";
import { insertSala } from "./module/gestionSala/salaLogica.js";
import { insertTarjeta, deleteTarjeta } from "./module/gestionTarjeta/tarjetaLogica.js";
import { createUsuarioYInsertCliente, findOneCliente, listarClientes } from "./module/gestionUsuarioYCliente/usuarioYClienteLogica.js";