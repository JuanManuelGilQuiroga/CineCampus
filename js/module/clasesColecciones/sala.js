import { Connect } from '../../../helpers/db/connect.js';

/**
 * Clase `Sala` para gestionar operaciones relacionadas con la colección de Salas en la base de datos.
 * Hereda de la clase `Connect`, que maneja la conexión a la base de datos.
 */
export class Sala extends Connect {
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
}