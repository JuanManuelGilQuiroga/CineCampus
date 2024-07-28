import { Sala } from "../../clasesColecciones/sala.js";

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