const Connect = require("../helpers/db/connect.cjs");

/**
 * Clase `Funcion` para gestionar operaciones relacionadas con la colección de Funciones en la base de datos.
 * Hereda de la clase `connect`, que maneja la conexión a la base de datos.
 */
module.exports = class Funcion extends Connect {
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

    /**
     * Obtiene todas las funciones de la colección.
     * @param {Object} funcionParametro - El objeto que especifica el filtro para buscar las funciones
     * @returns {Promise<Array>} Una promesa que resuelve con un array de documentos de funciones.
     */
    async findFuncion(funcionParametro) {
        let res = await this.collection.find(funcionParametro).toArray()
        return res
    }

    /**
     * @param {Object} arg - El objeto que especifica el filtro para buscar la funcion
     * @returns {Promise<Object>} Una promesa que resuelve con el documento de la funcion buscada
     */
    async findFuncionById(arg) {
        let [res] = await this.collection.find({_id: arg._id}).toArray()
        return res
    }

    /**
     * @param {Object} funcionParametro - El objeto que especifica el documento a insertar en la colección
     * @returns {Promise<Object>} Una promesa que resuelve con el resultado de la insercion de la funcion
     */
    async insertFuncion(funcionParametro) {
        let res = await this.collection.insertOne(funcionParametro)
        return res
    }

    /**
     * @param {Object} arg - El objeto que especifica el documento de lo que se desea actualizar en el documento
     * @returns {Promise<Object>} Una promesa que resuelve con el resultado de la actualizacion de la funcion
     */
    async updateFuncionQuitarAsiento(arg) {
        let res = await this.collection.updateOne(
            {_id: arg.funcion_id},
            {$pull: {asientos: arg.asiento}}
        )
        return res
    }

    async aggregateFuncion(arg){
        let [res] = await this.collection.aggregate([
            {
                $match: {
                    _id: arg._id
                }
            },
            {
                $lookup: {
                    from: "sala",
                    localField: "sala_id",
                    foreignField: "_id",
                    as: "sala_info"
                }
            },
            {
                $unwind: {
                    path: "$sala_info",
                    preserveNullAndEmptyArrays: false
                }
            },
            {
                $addFields: {
                    sala_nombre: "$sala_info.nombre",
                    sala_asientos: "$sala_info.asientos",
                    precio: "$sala_info.precio",
                    sala_tipo: "$sala_info.tipo",
                    preferencial: "$sala_info.preferencial"
                }
            },
            {
                $project: {
                    sala_info: 0
                }
            }
        ]).toArray();
        return res
    }
}