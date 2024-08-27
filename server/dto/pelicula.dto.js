const {ObjectId} = require('mongodb')

module.exports = class PeliculaDTO {
    fromHexStringToObjectId(arg){
        arg._id = new ObjectId(arg._id)
        return arg
    }

    fromObjectIdToHexString(arg){
        return arg.data.map(obj => {
            const newObj = { ...obj };
            Object.keys(newObj).forEach(key => {
                if (key.includes('_id') && newObj[key] instanceof ObjectId) {
                    newObj[key] = newObj[key].toString();
                }
            });
            return newObj;
        });
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