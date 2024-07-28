import { Connect } from '../../../helpers/db/connect.js';

/**
 * Clase `Funcion` para gestionar operaciones relacionadas con la colección de Funciones en la base de datos.
 * Hereda de la clase `connect`, que maneja la conexión a la base de datos.
 */
export class Funcion extends Connect {
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

    async findFuncion(funcionParametro) {
        let res = await this.collection.find(funcionParametro).toArray()
        return res
    }

    async findFuncionById(funcionParametro) {
        let res = await this.collection.findOne(funcionParametro)
        return res
    }

    async insertFuncion(funcionParametro) {
        let res = await this.collection.insertOne(funcionParametro)
        return res
    }
}