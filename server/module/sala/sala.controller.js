import { Sala } from "./sala.model.js";

/**
 * Inserta una nueva sala en la base de datos.
 * @param {Object} peliculaParametro - El objeto que contiene los detalles de la sala a insertar.
 * @property {string} nombre - El nombre de la sala.
 * @property {array} asientos - Los asientos que tiene la sala.
 *
 * @returns {Promise<Object>} - Una promesa que resuelve con el resultado de la inserción o un error si la sala ya existe.
 */
export const insertSala = async (salaParametro) => {
    let salaInstance = new Sala()
    let findSala = await salaInstance.findSalaById({
        nombre: salaParametro.nombre
    })
    if(findSala) {
        return { mensaje: "La sala ya existe" }
    }
    let res = await salaInstance.insertSala(salaParametro)
    let salaId = res.insertedId
    findSala = await salaInstance.findSalaById({
        _id: salaId
    })
    console.log(findSala)
    return res
}