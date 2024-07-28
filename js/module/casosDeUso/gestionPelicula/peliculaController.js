import { Pelicula } from "../../clasesColecciones/pelicula.js";

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

export const listarPeliculas = async (peliculaParametro) => {
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