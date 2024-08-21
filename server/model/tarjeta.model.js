const Connect = require("../helpers/db/connect");
/**
 * Clase `Sala` para gestionar operaciones relacionadas con la colección de Salas en la base de datos.
 * Hereda de la clase `Connect`, que maneja la conexión a la base de datos.
 */
module.exports = class Tarjeta extends Connect {
    static instanceTarjeta; // Instancia Singleton de la clase Tarjeta
    
    /**
     * Crea una instancia de la clase `Tarjeta`.
     * Implementa el patrón Singleton para garantizar que solo haya una instancia de esta clase.
     */
    constructor() {
        if (typeof Tarjeta.instanceTarjeta === "object") {
            return Tarjeta.instanceTarjeta;
        }
        super();
        this.collection = this.db.collection("tarjeta");
        Tarjeta.instanceSala = this;
        return this;
    }

    /**
     * @param {Object} tarjetaParametro - El objeto que especifica el filtro para buscar la tarjeta
     * @returns {Promise<Object>} Una promesa que resuelve con el documento de la tarjeta buscada
     */
    async findOneTarjetaByNumber(arg) {
        let res = await this.collection.findOne({
            numero: arg.numero
        })
        return res
    }

    /**
     * @param {Object} arg - El objeto que especifica el documento a insertar en la colección
     * @returns {Promise<Object>} Una promesa que resuelve con el resultado de la insercion de la tarjeta
     */
    async insertTarjeta(arg) {
        let { cliente_id, numero } = arg
        let res = await this.collection.insertOne({
            cliente_id,
            numero
        });
        return res
    }

    /**
     * @param {Object} tarjetaParametro - El objeto que especifica el documento a eliminar en la colección
     * @returns {Promise<Object>} Una promesa que resuelve con el resultado de la eliminacion de la tarjeta
     */
    async deleteTarjeta(tarjetaParametro) {
        let res = await this.collection.deleteOne(tarjetaParametro)
        return res
    }
}