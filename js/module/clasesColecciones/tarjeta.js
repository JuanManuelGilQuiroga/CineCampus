import { Connect } from '../../../helpers/db/connect.js';

/**
 * Clase `Sala` para gestionar operaciones relacionadas con la colección de Salas en la base de datos.
 * Hereda de la clase `Connect`, que maneja la conexión a la base de datos.
 */
export class Tarjeta extends Connect {
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

    async findOneTarjeta(tarjetaParametro) {
        let res = await this.collection.findOne(tarjetaParametro)
        return res
    }

    async insertTarjeta(tarjetaParametro) {
        let res = await this.collection.insertOne(tarjetaParametro)
        return res
    }
}