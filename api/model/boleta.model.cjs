const Connect = require("../helpers/db/connect.cjs");

/**
 * Clase `Boleta` para gestionar operaciones relacionadas con la colección de Boletas en la base de datos.
 * Hereda de la clase `Connect`, que maneja la conexión a la base de datos.
 */
module.exports = class Boleta extends Connect {
    static instanceBoleta; // Instancia Singleton de la clase Boleta
    
    /**
     * Crea una instancia de la clase `Boleta`.
     * Implementa el patrón Singleton para garantizar que solo haya una instancia de esta clase.
     */
    constructor() {
        if (typeof Boleta.instanceBoleta === "object") {
            return Boleta.instanceBoleta;
        }
        super();
        this.collection = this.db.collection("boleta");
        Boleta.instanceBoleta = this;
        return this;
    }

    /**
     * @param {Object} boletaParametro - El objeto que especifica el filtro para buscar la boleta
     * @returns {Promise<Object>} Una promesa que resuelve con el documento de la boleta buscada
     */
    async findOneBoleta(boletaParametro) {
        let res = await this.collection.findOne(boletaParametro)
        return res
    }

    /**
     * @param {Object} boletaParametro - El objeto que especifica el documento a insertar en la colección
     * @returns {Promise<Object>} Una promesa que resuelve con el resultado de la insercion de la boleta
     */
    async insertBoleta(boletaParametro) {
        let res = await this.collection.insertOne(boletaParametro)
        return res
    }

    /**
     * @param {Object} boletaFilter - El objeto que especifica el filtro para buscar el documento que se desea actualizar
     * @param {Object} boletaParametro - El objeto que especifica el documento de lo que se desea actualizar en el documento
     * @returns {Promise<Object>} Una promesa que resuelve con el resultado de la actualizacion de la boleta
     */
    async updateBoleta(boletaFilter, boletaParametro) {
        let res = await this.collection.updateOne(boletaFilter, boletaParametro)
        return res
    }

    /**
     * @param {Object} boletaParametro - El objeto que especifica el documento a eliminar de la coleccion
     * @returns {Promise<Object>} Una promesa que resuelve con el resultado de la eliminacion de la boleta
     */
    async deleteBoleta(boletaParametro) {
        let res = await this.collection.deleteOne(boletaParametro)
        return res
    }

    async aggregateBoleta(boletaParametro) {
        let [res] = await this.collection.aggregate(boletaParametro).toArray()
        return res
    }
}