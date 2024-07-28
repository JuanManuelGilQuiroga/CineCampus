import { Pelicula } from "../../clasesColecciones/pelicula.js";

export const insertPelicula = async (peliculaParametro) => {
    let peliculaInstance = new Pelicula()
    let findPelicula = await peliculaInstance.findPelicula(
        {titulo: peliculaParametro.titulo}
    )
    if(findPelicula.length > 0) {
        return { error: "La pelicula ya ha sido registrada"}
    }
    let res = await peliculaInstance.insertPelicula(peliculaParametro)
    let peliculaId = res.insertedId;
    findPelicula = await peliculaInstance.findPelicula(
        {_id: peliculaId}
    )
    console.log(findPelicula)
    return res
}