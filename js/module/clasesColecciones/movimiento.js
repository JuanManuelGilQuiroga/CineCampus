import { Connect } from '../../../helpers/db/connect.js';

/**
 * Clase `Movimiento` para gestionar operaciones relacionadas con la colección de Movimientos en la base de datos.
 * Hereda de la clase `Connect`, que maneja la conexión a la base de datos.
 */
export class Movimiento extends Connect {
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

    async findOneMovimiento(movimientoParametro) {
        let res = await this.collection.findOne(movimientoParametro)
        return res
    }

    async insertMovimiento(movimientoParametro) {
        let res = await this.collection.insertOne(movimientoParametro)
        return res
    }
}