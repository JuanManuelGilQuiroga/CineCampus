const { validationResult } = require("express-validator")
const Pelicula = require("../model/pelicula.model.cjs")
const PeliculaDTO = require("../dto/pelicula.dto.cjs")

/**
 * Inserta una nueva película en la base de datos.
 * @param {Object} peliculaParametro - El objeto que contiene los detalles de la película a insertar.
 * @property {string} titulo - El título de la película.
 * @property {string} genero - El género de la película.
 * @property {number} duracion_m - La duración de la película en minutos.
 * @property {string} sinopsis - La sinopsis de la película.
 * @property {Date} estreno - La fecha de estreno de la película en cartelera.
 * @property {Date} retiro - La fecha de retiro de la película de cartelera.
 *
 * @returns {Promise<Object>} - Una promesa que resuelve con el resultado de la inserción o un error si la película ya existe.
 */
const insertPelicula = async (peliculaParametro) => {
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
const listarPeliculasAntiguo = async () => {
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
const detallesPeliculaAntiguo = async (peliculaParametro) => {
    let peliculaInstance = new Pelicula()
    let res = await peliculaInstance.findPeliculaById({_id: peliculaParametro})
    if(!res) {
        return { error: "No se encontro la pelicula" }
    }
    return res
}

//------------------------------------------------------------------------------------------------------------------

const listarPeliculasSinDetalles = async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()});
    let peliculaDTO = new PeliculaDTO();
    let obj = new Pelicula();
    let resModel = await obj.findPeliculas();
    let data = (resModel.length > 0) ? peliculaDTO.templateMoviesExist(resModel) : peliculaDTO.templateNotMovies();
    if(data.status == 404) return res.status(data.status).json(data);
    console.log(data.data)
    if(data.status == 200) data.data = peliculaDTO.fromObjectIdToHexString(data)
    return res.status(data.status).json(data);
}

const listarPeliculasCoomingSoon = async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()});
    let peliculaDTO = new PeliculaDTO();
    let obj = new Pelicula();
    let resModel = await obj.findPeliculasCoomingSoon();
    let data = (resModel.length > 0) ? peliculaDTO.templateMoviesExist(resModel) : peliculaDTO.templateNotMovies();
    if(data.status == 404) return res.status(data.status).json(data);
    console.log(data.data)
    if(data.status == 200) data.data = peliculaDTO.fromObjectIdToHexString(data)
    return res.status(data.status).json(data);
}

const listarPeliculas = async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()});
    let peliculaDTO = new PeliculaDTO();
    let obj = new Pelicula();
    let resModel = await obj.listarPeliculas();
    let data = (resModel.length > 0) ? peliculaDTO.templateMoviesExist(resModel) : peliculaDTO.templateNotMovies();
    if(data.status == 404) return res.status(data.status).json(data);
    return res.status(data.status).json(data);
}

const detallesPelicula = async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()});
    let peliculaDTO = new PeliculaDTO();
    let obj = new Pelicula();
    let reqObjectId = peliculaDTO.fromHexStringToObjectId(req.query)
    let resModel = await obj.detallesPelicula(reqObjectId);
    let data = (resModel.length > 0) ? peliculaDTO.templateMoviesExist(resModel) : peliculaDTO.templateNotMovie();
    if(data.status == 404) return res.status(data.status).json(data);
    return res.status(data.status).json(data);
}

module.exports = {
    insertPelicula,
    listarPeliculasAntiguo,
    detallesPeliculaAntiguo,
    listarPeliculasSinDetalles,
    listarPeliculasCoomingSoon,
    listarPeliculas,
    detallesPelicula
}