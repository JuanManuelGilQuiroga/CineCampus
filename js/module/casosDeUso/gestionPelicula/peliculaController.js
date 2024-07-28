import { Pelicula } from "../../clasesColecciones/pelicula.js";

/**
 * Inserta una nueva película en la base de datos.
 * @param {Object} peliculaParametro - El objeto que contiene los detalles de la película a insertar.
 * @returns {Promise<Object>} - Una promesa que resuelve con el resultado de la inserción o un error si la película ya existe.
 */
export const insertPelicula = async (peliculaParametro) => {
    let peliculaInstance = new Pelicula()
    let findPelicula = await peliculaInstance.findPelicula(
        {titulo: peliculaParametro.titulo}
    )
    if(findPelicula.length > 0) {
        return { error: "La pelicula ya ha sido registrada"}
    }
    let res = await peliculaInstance.insertPelicula(peliculaParametro)
    let peliculaId = res.insertedId;
    findPelicula = await peliculaInstance.findPelicula(
        {_id: peliculaId}
    )
    console.log(findPelicula)
    return res
}

/**
 * Lista todas las películas con detalles sobre sus funciones.
 * @returns {Promise<Array|Object>} - Una promesa que resuelve con una lista de películas con sus detalles o un error si no se encontraron películas.
 */
export const listarPeliculas = async () => {
    let peliculaInstance = new Pelicula()
    let res = await peliculaInstance.aggregatePelicula([
        {$lookup: {from: "funcion", localField: "_id", foreignField: "pelicula_id", as: "funciones"}},
        {$match: {$and: [{estreno: {$lte: new Date()}},{retiro: {$gte: new Date()}}]}},
        {$unwind: "$funciones"},
        {$project: {sinopsis: 0, estreno: 0, retiro: 0, "funciones.pelicula_id": 0, "funciones.sala_id": 0}}
    ])
    if(!res) {
        return { error: "No se encontraron peliculas" }
    }
    return res
}

/**
 * Obtiene los detalles de una película específica por ID.
 * @param {ObjectId} peliculaParametro - El ID de la película a buscar.
 * @returns {Promise<Object>} - Una promesa que resuelve con los detalles de la película o un error si no se encontró la película.
 */
export const detallesPelicula = async (peliculaParametro) => {
    let peliculaInstance = new Pelicula()
    let res = await peliculaInstance.findPeliculaById({_id: peliculaParametro})
    if(!res) {
        return { error: "No se encontro la pelicula" }
    }
    return res
}