import { Connect } from '../../../helpers/db/connect.js';

/**
 * Clase `Cliente` para gestionar operaciones relacionadas con la colección de Clientes en la base de datos.
 * Hereda de la clase `Connect`, que maneja la conexión a la base de datos.
 */
export class Cliente extends Connect {
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
        console.log(this.conexion.db)
        return this;
    }

    async insertCliente(clienteParametro) {
        let res = await this.collection.insertOne(clienteParametro)
        return res
    }

    async createUsuario(usuarioParametro) {
        let adminDb = this.conexion.db('admin');
        let res = await adminDb.command(usuarioParametro)
        return res
    }

    async findOneCliente(clienteParametro) {
        let res = await this.collection.findOne(clienteParametro)
        return res
    }

    /**
     * Obtiene todos los clientes de la colección.
     * @param {Object} clienteParametro - El objeto que especifica el filtro para buscar los clientes
     * @returns {Promise<Array>} Una promesa que resuelve con un array de documentos de clientes.
     */
    async findCliente(clienteParametro) {
        let res = await this.collection.find(clienteParametro).toArray()
        return res
    }
}