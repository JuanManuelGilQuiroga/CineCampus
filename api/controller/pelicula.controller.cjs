const { validationResult } = require("express-validator")
const Pelicula = require("../model/pelicula.model.cjs")
const PeliculaDTO = require("../dto/pelicula.dto.cjs")

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
    if(data.status == 200) data.data = peliculaDTO.fromObjectIdToHexString(data)
    return res.status(data.status).json(data);
}

module.exports = {
    listarPeliculasSinDetalles,
    listarPeliculasCoomingSoon,
    listarPeliculas,
    detallesPelicula
}