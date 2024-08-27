const Connect = require("../helpers/db/connect.cjs");

/**
 * Clase `Movimiento` para gestionar operaciones relacionadas con la colección de Movimientos en la base de datos.
 * Hereda de la clase `Connect`, que maneja la conexión a la base de datos.
 */
module.exports = class Movimiento extends Connect {
    static instanceMovimiento; // Instancia Singleton de la clase Movimiento
    
    /**
     * Crea una instancia de la clase `Movimiento`.
     * Implementa el patrón Singleton para garantizar que solo haya una instancia de esta clase.
     */
    constructor() {
        if (typeof Movimiento.instanceMovimiento === "object") {
            return Movimiento.instanceMovimiento;
        }
        super();
        this.collection = this.db.collection("movimiento");
        Movimiento.instanceMovimiento = this;
        return this;
    }

    /**
     * @param {Object} movimientoParametro - El objeto que especifica el filtro para buscar el movimiento
     * @returns {Promise<Object>} Una promesa que resuelve con el documento del movimiento buscada
     */
    async findOneMovimiento(movimientoParametro) {
        let res = await this.collection.findOne(movimientoParametro)
        return res
    }

    /**
     * @param {Object} movimientoParametro - El objeto que especifica el documento a insertar en la colección
     * @returns {Promise<Object>} Una promesa que resuelve con el resultado de la insercion del movimiento
     */
    async insertMovimiento(movimientoParametro) {
        let res = await this.collection.insertOne(movimientoParametro)
        return res
    }
}