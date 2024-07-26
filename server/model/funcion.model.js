const Connect = require("../helpers/db/connect");

/**
 * Clase `Funcion` para gestionar operaciones relacionadas con la colección de Funciones en la base de datos.
 * Hereda de la clase `connect`, que maneja la conexión a la base de datos.
 */
module.exports = class Funcion extends Connect {
    static instanceFuncion; // Instancia Singleton de la clase Funcion
    
    /**
     * Crea una instancia de la clase `Funcion`.
     * Implementa el patrón Singleton para garantizar que solo haya una instancia de esta clase.
     */
    constructor() {
        if (typeof Funcion.instanceFuncion === "object") {
            return Funcion.instanceFuncion;
        }
        super();
        this.collection = this.db.collection("funcion");
        Funcion.instanceFuncion = this;
        return this;
    }

    /**
     * Obtiene todas las funciones de la colección.
     * @param {Object} funcionParametro - El objeto que especifica el filtro para buscar las funciones
     * @returns {Promise<Array>} Una promesa que resuelve con un array de documentos de funciones.
     */
    async findFuncion(funcionParametro) {
        let res = await this.collection.find(funcionParametro).toArray()
        return res
    }

    /**
     * @param {Object} funcionParametro - El objeto que especifica el filtro para buscar la funcion
     * @returns {Promise<Object>} Una promesa que resuelve con el documento de la funcion buscada
     */
    async findFuncionById(funcionParametro) {
        let res = await this.collection.findOne(funcionParametro)
        return res
    }

    /**
     * @param {Object} funcionParametro - El objeto que especifica el documento a insertar en la colección
     * @returns {Promise<Object>} Una promesa que resuelve con el resultado de la insercion de la funcion
     */
    async insertFuncion(funcionParametro) {
        let res = await this.collection.insertOne(funcionParametro)
        return res
    }

    /**
     * @param {Object} funcionFilter - El objeto que especifica el filtro para buscar el documento que se desea actualizar
     * @param {Object} funcionParametro - El objeto que especifica el documento de lo que se desea actualizar en el documento
     * @returns {Promise<Object>} Una promesa que resuelve con el resultado de la actualizacion de la funcion
     */
    async updateFuncion(funcionFilter, funcionParametro) {
        let res = await this.collection.updateOne(funcionFilter, funcionParametro)
        return res
    }
}