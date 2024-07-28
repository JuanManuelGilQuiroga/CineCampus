import { Connect } from '../../../helpers/db/connect.js';

/**
 * Clase `Pelicula` para gestionar operaciones relacionadas con la colección de peliculas en la base de datos.
 * Hereda de la clase `Connect`, que maneja la conexión a la base de datos.
 */
export class Pelicula extends Connect {
    static instancePelicula; // Instancia Singleton de la clase jugador
    
    /**
     * Crea una instancia de la clase `Pelicula`.
     * Implementa el patrón Singleton para garantizar que solo haya una instancia de esta clase.
     */
    constructor() {
        if (typeof Pelicula.instancePelicula === "object") {
            return Pelicula.instancePelicula;
        }
        super();
        this.collection = this.db.collection("pelicula");
        Pelicula.instancePelicula = this;
        return this;
    }

    async findPelicula(peliculaParametro) {
        let res = await this.collection.find(peliculaParametro).toArray()
        return res
    }

    async insertPelicula(peliculaParametro) {
        let res = await this.collection.insertOne(peliculaParametro)
        return res
    }
}