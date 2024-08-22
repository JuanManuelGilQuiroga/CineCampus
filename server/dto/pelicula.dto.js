const {ObjectId} = require('mongodb')

module.exports = class PeliculaDTO {
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
}