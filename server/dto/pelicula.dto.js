const {ObjectId} = require('mongodb')

module.exports = class PeliculaDTO {
    fromHexStringToObjectId(arg){
        arg._id = new ObjectId(arg._id)
        return arg
    }

    templateMoviesExist(arg){
        return {
            status: 200,
            data: arg
        }
    }

    templateNotMovies(){
        return {
            status: 404,
            message: "No hay peliculas disponibles"
        }
    }

    templateNotMovie(){
        return {
            status: 404,
            message: "La pelicula no esta registrada"
        }
    }
}