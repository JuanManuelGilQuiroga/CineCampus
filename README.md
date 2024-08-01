#### 

# CineCampus - Juan Manuel Gil Quiroga

### Indice:

[Descripción del proyecto](#descripción-del-proyecto)

[Instalación](#instalación)

[Configuración](#configuración)

[Estructura de Archivos y Carpetas](#estructura-de-archivos-y-carpetas)

[Justificación de la Estructura](#justificación-de-la-estructura)

[Ejecución del Proyecto](#ejecución-del-proyecto)

[Clases de las Colecciones](#clases-de-las-colecciones)

[API para Crear Peliculas](#1-api-para-crear-peliculas)

[API para Listar Películas](#2-api-para-listar-películas)

[API para Obtener Detalles de Película](#3-api-para-obtener-detalles-de-película)

[API para Crear Salas](#4-api-para-crear-salas)

[API para Crear Funciones](#5-api-para-crear-funciones)

[API para Verificar Disponibilidad de Asientos](#6-api-para-verificar-disponibilidad-de-asientos)

[API para Crear Usuario](#7-api-para-crear-usuario)

[API para Obtener Detalles de Usuario](#8-api-para-obtener-detalles-de-usuario)

[API para Listar Usuarios](#9-api-para-listar-usuarios)

[API para Actualizar Rol de Usuario](#10-api-para-actualizar-rol-de-usuario)

[API para Comprar Boletos - API para Reservar Asientos](#11. API para Comprar Boletos - API para Reservar Asientos)

[API para Cancelar Reserva de Asientos](#12. API para Cancelar Reserva de Asientos)

[API para Procesar Pagos](#13. API para Procesar Pagos)



### Descripción del proyecto.

CineCampus es una empresa de entretenimiento que se especializa en ofrecer una experiencia de cine completa y personalizada. La empresa desea desarrollar una aplicación web que permita a los usuarios seleccionar películas, comprar boletos y asignar asientos de manera eficiente y cómoda. La aplicación también ofrecerá opciones de descuento para usuarios con tarjeta VIP y permitirá realizar compras en línea.

El objetivo es desarrollar una serie de APIs para la aplicación web de CineCampus utilizando MongoDB como base de datos. Las APIs deberán gestionar la selección de películas, la compra de boletos, la asignación de asientos, y la implementación de descuentos para tarjetas VIP, con soporte para diferentes roles de usuario.



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
**Cadena de conexion(superAdmin)**:
mongodb://mongo:VljkCKrxozLMDcJAfREVOpguXgTHgYwm@monorail.proxy.rlwy.net:40728

**Cadena de conexion(Admin)**:
mongodb://admin:adminCineCampus@monorail.proxy.rlwy.net:40728/cineCampus

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

El código usado para crear peliculas es el siguiente:

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

El código usado para listar peliculas es el siguiente:

- **Función listarPeliculas:** Esta función es la encargada de realizar las validaciones y manipular los datos para la obtencion de una respuesta adecuada.
  - **variable res**: Es un aggregate que valida si las peliculas estan en cartelera todavia y si estan las retorna.

#### Ejecución: 

```javascript
console.log(await listarPeliculas())
```



## 3. API para Obtener Detalles de Película

Permitir la consulta de información detallada sobre una película específica, incluyendo sinopsis.

#### Documentación del Código

El código usado para obtener detalles de una pelicula es el siguiente:

- **Función detallesPelicula:** Esta función es la encargada de realizar las validaciones y manipular los datos para la obtencion de una respuesta adecuada.
  - **variable res**: Es un find que valida si las peliculas existen, y si estan, las retorna.

#### Ejecución: 

```javascript
let peliculaId = new ObjectId('[El objectId de la pelicula ingresada]')

console.log(await detallesPelicula(peliculaId))
```



## 4. API para Crear Salas

Permitir la creación de salas con detalles como nombre y asientos, este ultimo se trata de un array de strings, los cuales se componen de una letra mayúscula de la A a la G seguido de un numero del 1 al 10.

#### Documentación del Código

El código usado para crear salas es el siguiente:

- **Función insertSala:** Esta función es la encargada de realizar las validaciones y manipular los datos para la obtencion de una respuesta adecuada.
  - **Variable findSala**: Valida si la sala ya existe por medio del nombre.
  - **Variable res**: Inserta la sala a la colección.

#### Ejecución: 

```javascript
let salaInsertar = {
     nombre: "Sala 1",
     asientos: [
         "A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10",
         "B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10",
         "C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10",
         "D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "D10",
         "E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9", "E10",
         "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10",
         "G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9", "G10"
     ]
}

console.log(await insertSala(salaInsertar))
```



## 5. API para Crear Funciones

Permitir la creación de funciones con detalles como pelicula_id, sala_id, hora de inicio, hora de finalización, asientos (los cuales coinciden perfectamente con los de la sala asignada) y precio de la boleta en pesos Colombianos.

#### Documentación del Código

El código usado para crear funciones es el siguiente:

- **Función insertFuncion:** Esta función es la encargada de realizar las validaciones y manipular los datos para la obtencion de una respuesta adecuada.
  - **Variable findPelicula**: Valida si la pelicula ya existe por medio del id.
  - **Variable findSala**:  Valida si la sala ya existe por medio del id.
  - **Variable findFuncionPorSalaYFecha**:  Valida si la sala esta ocupada para la fecha deseada.
  - **if findPelicula.estreno > funcionParametro.fecha_hora_inicio**:  Valida si la pelicula esta en cartelera.
  - **if diferenciaInicioYFinalInt != findPelicula.duracion_m**: Valida que la diferencia entre la hora de inicio y de finalización de la función coincida con la cantidad de minutos que dura la pelicula.
  - **Variable res**: Inserta la función a la colección.

#### Ejecución: 

```javascript
let funcionInsertar = {
     pelicula_id: new ObjectId('[El objectId de la pelicula ingresada]'),
     sala_id: new ObjectId('[El objectId de la sala ingresada]'),
     fecha_hora_inicio: new Date('2024-07-25T21:30:00.000+00:00'),
     fecha_hora_final: new Date('2024-07-25T23:17:00.000+00:00'),
     precio_COP: 7000
 }

console.log(await insertFuncion(funcionInsertar))
```



## 6. API para Verificar Disponibilidad de Asientos

Permitir la consulta de la disponibilidad de asientos en una sala para una proyección específica.

#### Documentación del Código

El código usado para verificar los asientos disponibles en una función es el siguiente:

- **Función verificarDisponibilidadAsientos:** Esta función es la encargada de realizar las validaciones y manipular los datos para la obtención de una respuesta adecuada.
  - **Variable findFuncion**: Valida si la función ya existe por medio del id.
  - **if findFuncion.asientos.length == 0**:  Valida si existen asientos disponibles para la función.

#### Ejecución: 

```javascript
let funcionId = new ObjectId('[El objectId de la función ingresada]')

console.log(await verificarDisponibilidadAsientos(funcionId))
```



## 7. API para Crear Usuario

Permitir la creación de nuevos usuarios en el sistema, asignando roles y privilegios específicos (usuario estándar, usuario VIP o administrador).

#### Documentación del Código

El código usado para crear usuarios es el siguiente:

- **Función createUsuarioYInsertCliente:** Esta función es la encargada de realizar las validaciones y manipular los datos para la obtencion de una respuesta adecuada.
  - **Variable findCliente**: Valida si el cliente ya existe por medio del nick.
  - **Variable userRoleTipo**: Define el rol a asignar al usuario.
  - **Variable createUsuario**:  Crea el usuario en la base datos, asignándole los roles necesarios.
  - **Variable res**:  Inserta el documento del usuario en la colección cliente
  - **Variable insertTarjetaForCliente**: Valida si el usuario fue creado como VIP o Estándar, en caso de ser VIP llama a la función **insertTarjeta** para asignarle una tarjeta VIP.

#### Ejecución: 

```javascript
 let usuarioInsert = {
     nombre: "Juan",
     apellido: "Gil",
     nick: "juanMGQ",
     pwd: "jmgqEstandar",
     email: "jmgq2007@gmail.com",
     telefono: "315 6431235",
     tipo: "Estandar",
     numero_tarjeta: "1234 5678 9012 3456"
 }
 
 console.log(await createUsuarioYInsertCliente(usuarioInsert))
```



## 8. API para Obtener Detalles de Usuario

 Permitir la consulta de información detallada sobre un usuario, incluyendo su rol y estado de tarjeta VIP.

#### Documentación del Código

El código usado para obtener la información completa de un usuario especifico es el siguiente:

- **Función findOneCliente:** Esta función es la encargada de realizar las validaciones y manipular los datos para la obtención de una respuesta adecuada.
  - **Variable findCliente**: Valida si el cliente ya existe por medio del nick.
  - **If process.env.MONGO_USER != clienteNick && process.env.MONGO_USER != "admin"**: Valida si el usuario con el que esta conectado a la base de datos tiene permiso de obtener estos detalles.
  - **Variable detallesCliente**:  Obtiene todos los detalles del usuario incluyendo su numero de tarjeta.

#### Ejecución: 

```javascript
let clienteNick = "juanMGQ"

console.log(await findOneCliente(clienteNick))
```



## 9. API para Listar Usuarios

Permitir la consulta de todos los usuarios del sistema, con la posibilidad de filtrar por rol (VIP, estándar o administrador).

#### Documentación del Código

El código usado para listar los usuarios dependiendo de su tipo es el siguiente:

- **Función listarClientes:** Esta función es la encargada de realizar las validaciones y manipular los datos para la obtencion de una respuesta adecuada.
  - **Variable findClientes**: Busca los clientes teniendo en cuenta el tipo.
  - **If clienteParametro != "Admin" && clienteParametro != "Estandar" && clienteParametro != "VIP"**: Valida si el tipo de usuario para el filtro es correcto.

#### Ejecución: 

```javascript
let clientesBuscar = "VIP"

console.log(await listarClientes(clientesBuscar))
```



## 10. API para Actualizar Rol de Usuario

Permitir la actualización del rol de un usuario (por ejemplo, cambiar de usuario estándar a VIP, o viceversa).

#### Documentación del Código

#### *Usuario Estandar a Usuario VIP:*

El código usado para asignar a un usuario Estándar el tipo VIP es el siguiente:

- **Función insertTarjeta:** Esta función es la encargada de realizar las validaciones y manipular los datos para la obtención de una respuesta adecuada.
  - **Variable findTarjeta**: Valida si la tarjeta ya existe por medio del numero.
  - **Variable findCliente**: Valida si el cliente existe por medio del id.
  - **If process.env.MONGO_USER != findCliente.nick**:  Valida si el usuario con el que esta conectado a la base de datos tiene permiso de asignar una tarjeta VIP en nombre del usuario deseado.
  - **Variable revokeRolesFromUsuario**:  Quita el rol de usuarioEstandar al usuario.
  - **Variable grantRolesToUsuario**: Asigna el rol de usuarioVIP al usuario.
  - **Variable res**: Inserta la tarjeta en la colección.
  - **Variable updateClienteTipo**: Actualiza el campo tipo en el documento del cliente al que se acaba de asignar la tarjeta.

#### Ejecución: 

```javascript
 let tarjetaInsertar = {
     cliente_id: new ObjectId('[ObjectId del cliente que previamente se inserto]'),
     numero: "1234 5678 9012 3456"
 }
 
 console.log(await insertTarjeta(tarjetaInsertar))
```



#### *Usuario VIP a Usuario Estandar:*

El código usado para asignar a un usuario Vip el tipo Estándar es el siguiente:

- **Función deleteTarjeta:** Esta función es la encargada de realizar las validaciones y manipular los datos para la obtención de una respuesta adecuada.
  - **Variable findTarjeta**: Valida si la tarjeta ya existe por medio del numero.
  - **Variable findCliente**: Valida si el cliente existe por medio del id.
  - **If process.env.MONGO_USER != findCliente.nick**:  Valida si el usuario con el que esta conectado a la base de datos tiene permiso de eliminar la tarjeta VIP del usuario deseado.
  - **Variable revokeRolesFromUsuario**:  Quita el rol de usuarioVIP al usuario.
  - **Variable grantRolesToUsuario**: Asigna el rol de usuarioEstandar al usuario.
  - **Variable res**: Elimina la tarjeta de la colección.
  - **Variable updateClienteTipo**: Actualiza el campo tipo en el documento del cliente al que se acaba de eliminar la tarjeta.

#### Ejecución:

```javascript
let tarjetaEliminar = "1234 5678 9012 3456"

console.log(await deleteTarjeta(tarjetaEliminar))
```



## 11. API para Comprar Boletos - API para Reservar Asientos

Permitir la compra de boletos para una película específica, incluyendo la selección de la fecha y la hora de la proyección. - Permitir la selección y reserva de asientos para una proyección específica.

Esta función cubre ambos casos de uso debido a que se identifica una boleta pagada como la compra y una boleta no pagada como una reserva, el documento boleta tiene un ampo llamado "estado_pago", si este es true significa que se quiere pagar la boleta instantaneamente, fuera de la ejecución significaria que ya esta paga la boleta. En caso contrario, si es false significa que la boleta no esta paga por lo tanto es una reserva y es posible cancelarla.

#### Documentación del Código

El código usado para comprar una boleta o reservar un asiento es el siguiente:

- **Función insertBoleta:** Esta función es la encargada de realizar las validaciones y manipular los datos para la obtencion de una respuesta adecuada.
  - **Variable findCliente**: Valida si el cliente existe.
  - **Variable findFuncion**: Valida si la función existe.
  - **Variable disponibilityAsiento**: Valida si el asiento esta disponible.
  - **If process.env.MONGO_USER != findCliente.nick**: Valida si el usuario con el que esta conectado a la base de datos tiene permiso de comprar una boleta o reservar un asiento a nombre del usuario deseado.
  - **Variable res**: Inserta la boleta en la colección.
  - **Variable aggregateBoletaInfo**: Aggregate para extraer función importante de diferentes documentos, para hacer mas entendible el codigo a la hora de la ejecución.
  - **Variable updateFuncionAsientos**: Actualiza la función para eliminar del array de asientos, el asiento que ha sido apartado.
  - **Variable insertMovimientoInmediato**: Si el documento de la boleta se inserto con estado_pago == true entonces llama a la funcion insertMovimiento para realizar el pago.
  - **Variable cambiarEstadoPago**: Si el documento de la boleta se inserto con estado_pago == true pero al pagar el monto ingresado no era el correcto, va a devolver error, sin embargo la boleta ya estara ingresada, asi que esta variable lleva a cabo un update que actualiza estado_pago pasandolo a false. 
    *En caso de error al ingresar el movimiento, debera dirigirse a ingresarlo por medio de la función especifica para esta tarea.*

#### Ejecución: 

```javascript
  let boletaDetalle = {
      cliente_id: new ObjectId('[ObjectId del cliente previamente insertado]'),
      funcion_id: new ObjectId('[ObjectId de la funcion previamente insertado]'),
      asiento: "A2",
      estado_pago: false,
      monto_COP: 7000
 }
  
  console.log(await insertBoleta(boletaDetalle))
```



## 12. API para Cancelar Reserva de Asientos

PPermitir la cancelación de una reserva de asiento ya realizada.

El documento boleta tiene un ampo llamado "estado_pago", si es false significa que la boleta no esta paga, por lo tanto califica como una reserva y se puede cancelar.

#### Documentación del Código

El código usado para cancelar una reserva es el siguiente:

- **Función deleteReserva:** Esta función es la encargada de realizar las validaciones y manipular los datos para la obtencion de una respuesta adecuada.
  - **Variable findReserva**: Valida si la reserva existe.
  - **If findReserva.estado_pago != false**: Valida si la reserva ya esta paga.
  - **Variable findCliente**: Valida si el cliente si hizo esa reserva.
  - **If process.env.MONGO_USER != findCliente.nick**: Valida si el usuario con el que esta conectado a la base de datos tiene permiso de eliminar una reserva de un asiento a nombre del usuario deseado.
  - **Variable res**: Elimina la boleta de la colección.
  - **Variable aggregateBoletaInfo**: Aggregate para extraer función importante de diferentes documentos, para hacer mas entendible el codigo a la hora de la ejecución.
  - **Variable updateAsientoFuncion**: Actualiza la función para agregar nuevamente al array de asientos, el asiento que habia sido apartado.

#### Ejecución: 

```javascript
let boletaId = new ObjectId('[ObjectId de la boleta insertada]')

console.log(await deleteReserva(boletaId))
```





## 13. API para Procesar Pagos

Permitir el procesamiento de pagos en línea para la compra de boletos.

#### Documentación del Código

El código usado para pagar una boleta es el siguiente:

- **Función insertMovimiento:** Esta función es la encargada de realizar las validaciones y manipular los datos para la obtencion de una respuesta adecuada.
  - **Variable findMovimiento**: Valida si ya existe un pago asociado a la boleta.
  - **Variable findBoleta**: Busca la boleta.
  - **Variable findCliente**: Valida si el cliente si hizo esa reserva.
  - **If findCliente.tipo == "VIP" && movimientoParametro.monto_COP != precioBoletaVIP**: Valida que el monto del movimiento coincida con el precio esperado para clientes VIP
  - **Variable res**: Inserta el movimiento en la colección.
  - **Variable updateBoletaEstadoPago**: Actualiza el estado_pago de la boleta a true.

#### Ejecución: 

```javascript
 let movimientoInsertar = {
     boleta_id: new ObjectId('[ObjectId de la boleta insertada]'),
     monto_COP: 5600
 }
 
 console.log(await insertMovimiento(movimientoInsertar))
```

