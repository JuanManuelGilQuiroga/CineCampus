import { Connect } from '../../../helpers/db/connect.js';

/**
 * Clase `Boleta` para gestionar operaciones relacionadas con la colección de Boletas en la base de datos.
 * Hereda de la clase `Connect`, que maneja la conexión a la base de datos.
 */
export class Boleta extends Connect {
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
}