#### 

# CineCampus - Juan Manuel Gil Quiroga

### Indice:



------



### Descripción del proyecto.

Este proyecto es una aplicación de gestión de una liga de fútbol llamada Liga BetPlay. Está diseñada para ayudar a los administradores de la liga a gestionar equipos, jugadores, y sus rendimientos, proporcionando funcionalidades completas para la administración y generación de reportes detallados. La aplicación utiliza Node.js y MongoDB para el backend, siguiendo patrones de diseño como Singleton para la gestión de conexiones a la base de datos.



### Instalación

Para instalar y configurar el proyecto, sigue estos pasos:

1. Clona el repositorio en tu máquina local:

   ```bash
   git clone https://github.com/JuanManuelGilQuiroga/proyectoMongoII
   ```

2. Navega al directorio del proyecto:

   ```bash
   cd proyectoMongoII
   ```

3. Instala las dependencias necesarias:

   ```bash
   npm install
   ```



### Configuración

Asegúrate de tener configurado el archivo '.env' las variables requeridas para la conexión a la base de datos.

```javascript
MONGO_USER=[USUARIO DE LA BASE DE DATOS EN MONGO]
MONGO_PORT=[PUERTO DE LA BASE DE DATOS]
MONGO_PWD=[CONTRASEÑA DE LA BASE DE DATOS]
MONGO_HOST=[HOS DE LA BASE DE DATOS]
MONGO_CLUSTER=[CLUSTER O SERVIDOR AL DONDE ESTA ALOJADA LA BASE DE DATOS]
MONGO_DB=[NOMBRE DE LA BASE DE DATOS]
```



## Estructura de Archivos y Carpetas

```
ProyectoMongoII/
├── helpers/
│   └── db/
│       └── connect.js
├── js/
│   ├── module/
│   │   ├── gestionBoleta/
│   │   │   ├── boleta.js
│   │   │   └── boletaLogica.js
│   │   ├── gestionFuncion/
│   │   │   ├── funcion.js
│   │   │   └── funcionLogica.js
│   │   ├── gestionMovimiento/
│   │   │   ├── movimiento.js
│   │   │   └── movimientoLogica.js
│   │   ├── gestionPelicula/
│   │   │   ├── pelicula.js
│   │   │   └── peliculaLogica.js
│   │   ├── gestionSala/
│   │   │   ├── sala.js
│   │   │   └── salaLogica.js
│   │   ├── gestionTarjeta/
│   │   │   ├── tarjeta.js
│   │   │   └── tarjetaLogica.js
│   │   └── gestionUsuarioYCliente/
│   │       ├── cliente.js
│   │       └── usuarioYClienteLogica.js
│   └── main.js
├── node_modules/
├── .env.template
├── .gitignore
├── diagramaColecciones.js
├── package-lock.json
├── package.json
└── README.md

```

- **helpers/db/connect.js**: Configuración y conexión a la base de datos MongoDB.
- **js/module/**: Contiene los diferentes módulos para la gestión de la aplicación.
  - **gestionBoleta/**: Módulo para la gestión de boletos.
    - `boleta.js`: Definición del modelo de boleto.
    - `boletaLogica.js`: Lógica de negocio relacionada con boletos.
  - **gestionFuncion/**: Módulo para la gestión de funciones.
    - `funcion.js`: Definición del modelo de función.
    - `funcionLogica.js`: Lógica de negocio relacionada con funciones.
  - **gestionMovimiento/**: Módulo para la gestión de movimientos.
    - `movimiento.js`: Definición del modelo de movimiento.
    - `movimientoLogica.js`: Lógica de negocio relacionada con movimientos.
  - **gestionPelicula/**: Módulo para la gestión de películas.
    - `pelicula.js`: Definición del modelo de película.
    - `peliculaLogica.js`: Lógica de negocio relacionada con películas.
  - **gestionSala/**: Módulo para la gestión de salas.
    - `sala.js`: Definición del modelo de sala.
    - `salaLogica.js`: Lógica de negocio relacionada con salas.
  - **gestionTarjeta/**: Módulo para la gestión de tarjetas.
    - `tarjeta.js`: Definición del modelo de tarjeta.
    - `tarjetaLogica.js`: Lógica de negocio relacionada con tarjetas.
  - **gestionUsuarioYCliente/**: Módulo para la gestión de usuarios y clientes.
    - `cliente.js`: Definición del modelo de cliente.
    - `usuarioYClienteLogica.js`: Lógica de negocio relacionada con usuarios y clientes.
- **main.js**: Archivo principal de la aplicación que inicia el servidor.



### Justificación de la Estructura

La estructura de carpetas modular permite una gestión clara y eficiente de las validaciones y la interacción con la base de datos. Al separar cada funcionalidad en módulos específicos, como la gestión de boletos, funciones, movimientos, películas, salas, tarjetas y usuarios/clientes, se logra una clara separación de responsabilidades. Esto no solo mejora la mantenibilidad y escalabilidad del código, sino que también facilita la implementación y reutilización de validaciones y lógica de negocio, asegurando una interacción consistente y segura con la base de datos.



## Ejecución del Proyecto

El proyecto se ejecuta directamente en el archivo main.js, por medio del comando **npm run dev**, este archivo cuenta con las importaciones de todas las funciones a las cuales se le pasaran los parametros para ejecutar los casos de uso.

#### **Ejemplo**:

Para ejecutar el caso de uso de ***API para Obtener Detalles de Película**, se necesita importar y llamar a la función ***detallesPelicula*** de la siguiente manera:

```javascript
import { detallesPelicula } from "./module/gestionPelicula/peliculaLogica.js";

let peliculaId = new ObjectId('66a597b03d45ef35a8b018ac')

console.log(await detallesPelicula(peliculaId))


```

## Clases de las Colecciones

**boleta.js**: Define la clase `Boleta`, que maneja las operaciones CRUD para la colección de boleta en la base de datos.

- **Método `findOneBoleta`**: 

  - Obtiene una boleta especifica.

- **Método `insertBoleta`**: 

  - Inserta una nueva boleta en la colección `boleta`.

- **Método `updateBoleta`**: 

  - Actualiza la información de una boleta en la colección `boleta`.

- **Método `deleteBoleta`**: 

  - Elimina una boleta en la colección `boleta`.

- **Método `aggregateBoleta` **

  - Se usa para realizar consultas que necesitan de la información de diferentes colecciones.

    

**funcion.js**: Define la clase `Funcion`, que maneja las operaciones CRUD para la colección de funcion en la base de datos.

- **Método `findFuncionById`**: 
  - Obtiene una función especifica.
- **Método `findFuncion` **
  - Obtiene todas las funciones de la colección.
- **Método `insertFuncion`**: 
  - Inserta una nueva función en la colección `función`.
- **Método `updateFuncion`**: 
  - Actualiza la información de una función en la colección `función`.



**movimiento.js**: Define la clase `Movimiento`, que maneja las operaciones CRUD para la colección de movimiento en la base de datos.

- **Método `findOneMovimiento`**: 
  - Obtiene un movimiento especifico.
- **Método `insertMovimiento`**: 
  - Inserta un nuevo movimiento en la colección `movimiento`.



**pelicula.js**: Define la clase `Pelicula`, que maneja las operaciones CRUD para la colección de pelicula en la base de datos.

- **Método `findPeliculaById`**: 
  - Obtiene una pelicula especifica.
- **Método `findPelicula` **
  - Obtiene todas las peliculas de la colección.
- **Método `insertPelicula`**: 
  - Inserta una nueva pelicula en la colección `pelicula`.
- **Método `aggregatePelicula`**: 
  - Se usa para realizar consultas que necesitan de la información de diferentes colecciones.



**sala.js**: Define la clase `Sala`, que maneja las operaciones CRUD para la colección de sala en la base de datos.

- **Método `findSalaById`**: 
  - Obtiene una sala especifica.
- **Método `findSala` **
  - Obtiene todas las salas de la colección.
- **Método `insertSala`**: 
  - Inserta una nueva sala en la colección `sala`.



**tarjeta.js**: Define la clase `Tarjeta`, que maneja las operaciones CRUD para la colección de tarjeta en la base de datos.

- **Método `findOneTarjeta`**: 
  - Obtiene una tarjeta especifica.
- **Método `insertTarjeta`**: 
  - Inserta una nueva tarjeta en la colección `tarjeta`.
- **Método `deleteTarjeta`**: 
  - Elimina una tarjeta en la colección `tarjeta.`



**cliente.js**: Define la clase `cliente`, que maneja las operaciones CRUD para la colección de cliente en la base de datos.

- **Método `findOneCliente`**: 
  - Obtiene un cliente especifico.
- **Método `findCliente`**: 
  - Obtiene todos los clientes de la colección.
- **Método `insertCliente`**: 
  - Inserta un nuevo cliente en la colección `cliente`.
- **Método `updateCliente`**: 
  - Actualiza la información de un cliente en la colección `cliente`.
- **Método `commandUsuario`**: 
  - Se usa para las operaciones relacionadas a la creacion o modificacion de usuarios en la base de datos.
- **Método `aggregateCliente`**: 
  - Se usa para realizar consultas que necesitan de la información de diferentes colecciones.





## 1. API para Crear Peliculas

Permitir la creación de peliculas con detalles como titulo, genero, duracion en minutos, sinopsis, fecha de estreno y fecha de retiro de cartelera.

#### Documentación del Código

El codigo usado para crear peliculas es el siguiente:

- **Función insertPelicula:** Esta función es la encargada de realizar todas las validaciones y manipular los datos para la obtención de una respuesta adecuada.
  - **variable findPelicula**: Verifica por medio del titulo si la pelicula ya esta registrada en la base de datos.
  - **variable res**: Inserta la pelicula a la colección.

#### Ejecución: 

```javascript
let peliculaInsertar = {
     titulo: "Deadpool & Wolverine",
     genero: "Accion",
     duracion_m: 127,
     sinopsis: "Wolverine se recupera de sus heridas cuando cruza su camino con Deadpool, quien ha viajado en el tiempo para curarlo con la esperanza de hacerse amigos y formar un equipo para acabar con un enemigo común.",
     estreno: new Date("2024-07-25"),
     retiro: new Date("2024-09-25")
}

console.log(await insertPelicula(peliculaInsertar))
```



## 2. API para Listar Películas

Permitir la consulta de todas las películas disponibles en el catálogo, con detalles como título, género, duración y horarios de proyección.

#### Documentación del Código

El codigo usado para crear peliculas es el siguiente:

- **Función listarPeliculas:** Esta función es la encargada de realizar las validaciones y manipular los datos para la obtencion de una respuesta adecuada.
  - **variable res**: Es un aggregate que valida si las peliculas estan en cartelera todavia y si estan las retorna.

#### Ejecución: 

```javascript
console.log(await listarPeliculas())
```



## 3. API para Obtener Detalles de Película

Permitir la consulta de información detallada sobre una película específica, incluyendo sinopsis.

#### Documentación del Código

El codigo usado para crear peliculas es el siguiente:

- **Función detallesPelicula:** Esta función es la encargada de realizar las validaciones y manipular los datos para la obtencion de una respuesta adecuada.
  - **variable res**: Es un find que valida si las peliculas existen, y si estan, las retorna.

#### Ejecución: 

```javascript
let peliculaId = new ObjectId('[El objectId de la pelicula ingresada]')

console.log(await detallesPelicula(peliculaId))
```

