import { connect } from '../../../helpers/db/connect.js';

/**
 * Clase `Cliente` para gestionar operaciones relacionadas con la colección de Clientes en la base de datos.
 * Hereda de la clase `connect`, que maneja la conexión a la base de datos.
 */
export class Cliente extends connect {
    static instanceCliente; // Instancia Singleton de la clase Cliente
    
    /**
     * Crea una instancia de la clase `Cliente`.
     * Implementa el patrón Singleton para garantizar que solo haya una instancia de esta clase.
     */
    constructor() {
        if (typeof Cliente.instanceCliente === "object") {
            return Cliente.instanceCliente;
        }
        super();
        this.collection = this.db.collection("cliente");
        Cliente.instanceCliente = this;
        return this;
    }
}