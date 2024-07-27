import { connect } from '../../../helpers/db/connect.js';

/**
 * Clase `Funcion` para gestionar operaciones relacionadas con la colección de Funciones en la base de datos.
 * Hereda de la clase `connect`, que maneja la conexión a la base de datos.
 */
export class Funcion extends connect {
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
}