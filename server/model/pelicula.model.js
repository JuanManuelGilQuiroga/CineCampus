const Connect = require("../helpers/db/connect");

/**
 * Clase `Pelicula` para gestionar operaciones relacionadas con la colección de peliculas en la base de datos.
 * Hereda de la clase `Connect`, que maneja la conexión a la base de datos.
 */
module.exports = class Pelicula extends Connect {
    static instancePelicula; // Instancia Singleton de la clase jugador
    
    /**
     * Crea una instancia de la clase `Pelicula`.
     * Implementa el patrón Singleton para garantizar que solo haya una instancia de esta clase.
     */
    constructor() {
        if (typeof Pelicula.instancePelicula === "object") {
            return Pelicula.instancePelicula;
        }
        super();
        this.collection = this.db.collection("pelicula");
        Pelicula.instancePelicula = this;
        return this;
    }

    /**
     * Obtiene todas las peliculas de la colección.
     * @param {Object} peliculaParametro - El objeto que especifica el filtro para buscar las peliculas
     * @returns {Promise<Array>} Una promesa que resuelve con un array de documentos de peliculas.
     */
    async findPelicula(peliculaParametro) {
        let res = await this.collection.find(peliculaParametro).toArray()
        return res
    }

    /**
     * @param {Object} peliculaParametro - El objeto que especifica el filtro para buscar la pelicula
     * @returns {Promise<Object>} Una promesa que resuelve con el documento de la pelicula buscada
     */
    async findPeliculaById(peliculaParametro) {
        let res = await this.collection.findOne(peliculaParametro)
        return res
    }

    /**
     * @param {Object} peliculaParametro - El objeto que especifica el documento a insertar en la colección
     * @returns {Promise<Object>} Una promesa que resuelve con el resultado de la insercion de la pelicula
     */
    async insertPelicula(peliculaParametro) {
        let res = await this.collection.insertOne(peliculaParametro)
        return res
    }

    /**
     * @returns {Promise<Object>} Una promesa que resuelve con el documento de las peliculas buscadas junto con la informacion extra de otros documentos
     */
    async listarPeliculas() {
        let res = await this.collection.aggregate([
            {$lookup: {from: "funcion", localField: "_id", foreignField: "pelicula_id", as: "funciones"}},
            {$match: {$and: [{estreno: {$lte: new Date()}},{retiro: {$gte: new Date()}}]}},
            {$unwind: "$funciones"},
            {$project: {sinopsis: 0, estreno: 0, retiro: 0, "funciones.pelicula_id": 0, "funciones.sala_id": 0}}
        ]).toArray()
        return res
    }
}