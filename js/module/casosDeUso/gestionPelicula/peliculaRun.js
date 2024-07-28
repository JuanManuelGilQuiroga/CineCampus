import { ObjectId } from "mongodb";
import { insertPelicula, listarPeliculas} from "./peliculaController.js"

let peliculaInsertar = {
    titulo: "Whiplash: música y obsesión",
    genero: "Drama",
    duracion_m: 107,
    sinopsis: "Andrew Neiman es un joven y ambicioso baterista de jazz. Marcado por el fracaso de la carrera literaria de su padre, está obsesionado con alcanzar la cima dentro del elitista conservatorio de música de la Costa Este en el que estudia.",
    estreno: new Date("2024-07-25"),
    retiro: new Date("2024-09-25")
}

//console.log(await insertPelicula(peliculaInsertar))
console.log(await listarPeliculas())