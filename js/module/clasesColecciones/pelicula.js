import { connect } from '../../../helpers/db/connect.js';

/**
 * Clase `Pelicula` para gestionar operaciones relacionadas con la colección de peliculas en la base de datos.
 * Hereda de la clase `connect`, que maneja la conexión a la base de datos.
 */
export class Pelicula extends connect {
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
}