const Connect = require("../helpers/db/connect");

/**
 * Clase `Sala` para gestionar operaciones relacionadas con la colección de Salas en la base de datos.
 * Hereda de la clase `Connect`, que maneja la conexión a la base de datos.
 */
module.exports = class Sala extends Connect {
    static instanceSala; // Instancia Singleton de la clase Sala
    
    /**
     * Crea una instancia de la clase `Sala`.
     * Implementa el patrón Singleton para garantizar que solo haya una instancia de esta clase.
     */
    constructor() {
        if (typeof Sala.instanceSala === "object") {
            return Sala.instanceSala;
        }
        super();
        this.collection = this.db.collection("sala");
        Sala.instanceSala = this;
        return this;
    }

    /**
     * Obtiene todas las salas de la colección.
     * @param {Object} salaParametro - El objeto que especifica el filtro para buscar las salas
     * @returns {Promise<Array>} Una promesa que resuelve con un array de documentos de salas.
     */
    async findSala(salaParametro) {
        let res = await this.collection.find(salaParametro).toArray()
        return res
    }

    /**
     * @param {Object} salaParametro - El objeto que especifica el filtro para buscar la sala
     * @returns {Promise<Object>} Una promesa que resuelve con el documento de la sala buscada
     */
    async findSalaById(salaParametro) {
        let res = await this.collection.findOne(salaParametro)
        return res
    }

    /**
     * @param {Object} salaParametro - El objeto que especifica el documento a insertar en la colección
     * @returns {Promise<Object>} Una promesa que resuelve con el resultado de la insercion de la sala
     */
    async insertSala(salaParametro) {
        let res = await this.collection.insertOne(salaParametro)
        return res
    }
}