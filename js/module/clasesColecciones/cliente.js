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

    /**
     * @param {Object} clienteParametro - El objeto que especifica el documento a insertar en la colección
     * @returns {Promise<Object>} Una promesa que resuelve con el resultado de la insercion del cliente
     */
    async insertCliente(clienteParametro) {
        let res = await this.collection.insertOne(clienteParametro)
        return res
    }

    /**
     * @param {Object} usuarioParametro - El objeto que especifica el comando a usar con respecto a la creacion de usuarios o el asignamiento de roles
     * @returns {Promise<Object>} Una promesa que resuelve con el documento del usuario insertado o con rol agregado
     */
    async commandUsuario(usuarioParametro) {
        let res = await this.db.command(usuarioParametro)
        return res
    }

    /**
     * @param {Object} clienteParametro - El objeto que especifica el filtro para buscar el cliente
     * @returns {Promise<Object>} Una promesa que resuelve con el documento del cliente buscado
     */
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

    /**
     * @param {Object} clienteFilter - El objeto que especifica el filtro para buscar el documento que se desea actualizar
     * @param {Object} clienteParametro - El objeto que especifica el documento de lo que se desea actualizar en el documento
     * @returns {Promise<Object>} Una promesa que resuelve con el resultado de la actualizacion del cliente
     */
    async updateCliente(clienteFilter, clienteParametro) {
        let res = await this.collection.updateOne(clienteFilter, clienteParametro)
        return res
    }

    async aggregateCliente(clienteParametro) {
        let res = await this.collection.aggregate(clienteParametro).toArray()
        return res
    }
}