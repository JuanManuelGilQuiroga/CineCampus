import { ObjectId } from "mongodb";
import { detallesPelicula, insertPelicula, listarPeliculas} from "./peliculaController.js"

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
let peliculaInsertar = {
    titulo: "Whiplash: música y obsesión",
    genero: "Drama",
    duracion_m: 107,
    sinopsis: "Andrew Neiman es un joven y ambicioso baterista de jazz. Marcado por el fracaso de la carrera literaria de su padre, está obsesionado con alcanzar la cima dentro del elitista conservatorio de música de la Costa Este en el que estudia.",
    estreno: new Date("2024-07-25"),
    retiro: new Date("2024-09-25")
}

/**
 * ObjetoId de la película específica que se usará para buscar detalles.
 * @type {ObjectId}
 */
let peliculaId = new ObjectId('66a597b03d45ef35a8b018ac')

// Inserta una nueva película en la base de datos
//console.log(await insertPelicula(peliculaInsertar))

// Lista todas las películas con detalles sobre sus funciones
//console.log(await listarPeliculas())

// Obtiene los detalles de una película específica por ID
console.log(await detallesPelicula(peliculaId))