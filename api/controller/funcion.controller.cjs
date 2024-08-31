const { validationResult } = require('express-validator');
const { ObjectId } = require('mongodb');
const Pelicula = require('../model/pelicula.model.cjs');
const Sala = require('../model/sala.model.cjs');
const Funcion = require('../model/funcion.model.cjs');
const FuncionDTO = require('../dto/funcion.dto.cjs');
const Cliente = require('../model/usuario.model.cjs');
const UsuarioDTO = require('../dto/usuario.dto.cjs');


/**
 * Inserta una nueva función en la base de datos.
 * @param {Object} funcionParametro - El objeto que contiene los detalles de la funcion a insertar.
 * @property {ObjectId} pelicula_id - El ID de la película asociada a la función.
 * @property {ObjectId} sala_id - El ID de la sala donde se proyectará la película.
 * @property {Date} fecha_hora_inicio - La fecha y hora de inicio de la función.
 * @property {Date} fecha_hora_final - La fecha y hora de finalización de la función.
 * @property {number} precio_COP - El precio en COP de la función.
 *
 * @returns {Promise<Object>} Una promesa que resuelve con el resultado de la inserción o un error si se encuentra alguno.
 */
const insertFuncion = async (funcionParametro) => {
    let funcionInstance = new Funcion()
    let peliculaInstance = new Pelicula()
    let salaInstance = new Sala()

    // Verifica si la película existe
    let findPelicula = await peliculaInstance.findPeliculaById({_id: funcionParametro.pelicula_id})
    if(!findPelicula) {
        return {error: "La película no existe en la base de datos."}
    }

    // Verifica si la sala existe
    let findSala = await salaInstance.findSalaById({_id: funcionParametro.sala_id})
    if(!findSala) {
        return {error: "La sala no existe en la base de datos."}
    }

    // Verifica si la sala está ocupada para la fecha deseada
    let findFuncionPorSalaYFecha = await funcionInstance.findFuncion({
            sala_id: new ObjectId('66a58fab8a7ddb4b6799c27a'),
            $and: [
                { fecha_hora_inicio: { $gte: funcionParametro.fecha_hora_inicio, $lte: funcionParametro.fecha_hora_final } },
                { fecha_hora_final: { $gte: funcionParametro.fecha_hora_inicio, $lte: funcionParametro.fecha_hora_final } }
            ]
        }    
    )
    if(findFuncionPorSalaYFecha.length > 0) {
        return { error: "La sala esta ocupada para la fecha deseada." }
    }

    // Verifica si la película está en cartelera para la fecha asignada
    if(findPelicula.estreno > funcionParametro.fecha_hora_inicio) {
        return { error: "La película no esta en cartelera para la fecha asignada." }
    } else if(findPelicula.retiro < funcionParametro.fecha_hora_inicio) {
        return { error: "La película ya se ha retirado de la cartelera para la fecha asignada." }
    }

    // Verifica si la duración de la función coincide con la duración de la película
    let diferenciaHoraInicioYHoraFinal = funcionParametro.fecha_hora_final - funcionParametro.fecha_hora_inicio
    let diferenciaInicioYFinalInt = diferenciaHoraInicioYHoraFinal/(1000*60)
    if(diferenciaInicioYFinalInt != findPelicula.duracion_m) {
        return { error: "La duración de la película no coincide." }
    }

    // Inserta la función
    let res = await funcionInstance.insertFuncion({
        pelicula_id: funcionParametro.pelicula_id,
        sala_id: funcionParametro.sala_id,
        fecha_hora_inicio: funcionParametro.fecha_hora_inicio,
        fecha_hora_final: funcionParametro.fecha_hora_final,
        asientos: findSala.asientos,
        precio_COP: funcionParametro.precio_COP
    })
    let funcionId = res.insertedId;
    let findFuncion = await funcionInstance.findFuncionById({_id: funcionId})
    console.log(findFuncion)
    return res
}


/**
 * Inserta una nueva función en la base de datos.
 * @param {Object} funcionParametro - El objeto que contiene el id de la funcion a buscar.
 * @returns {Promise<Object>} Una promesa que resuelve con el resultado de la busqueda o un error si se encuentra alguno.
 */
const verificarDisponibilidadAsientos = async (funcionParametro) => {
    let funcionInstance = new Funcion()
    let findFuncion = await funcionInstance.findFuncionById({_id: funcionParametro})
    if(!findFuncion) {
        return { error: "La función no existe en la base de datos." }
    }
    if(findFuncion.asientos.length == 0) {
        return { error: "La función no tiene asientos disponibles." }
    }
    
    return {
        nota: "Array de asientos disponibles",
        asientos: findFuncion.asientos.sort()
    }
}

//--------------------------------------------------------------------------------------------------------------------------------

const verificarAsientos = async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()});
    let funcionDTO = new FuncionDTO();
    let obj = new Funcion();
    let reqObjectId = funcionDTO.fromHexStringToObjectId(req.query);
    let resModel = await obj.findFuncionById(reqObjectId);
    let data = (resModel) ? funcionDTO.templateExistFunction(resModel) : funcionDTO.templateNotFunctions();
    if(data.status == 404) return res.status(data.status).json(data);
    data = (resModel.asientos.length == 0) ? funcionDTO.templateNotSeating() : funcionDTO.templateSeating(resModel);
    if(data.status == 404) return res.status(data.status).json(data);
    funcionDTO.templateSeating(resModel.asientos.sort());
    return res.status(data.status).json(data);
}

const verificarPrecioAsientos = async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()});
    let funcionDTO = new FuncionDTO();
    let usuarioDTO = new UsuarioDTO();
    let objFuncion = new Funcion();
    let objUsuario = new Cliente();
    let reqFuncionId = funcionDTO.fromHexStringToObjectId(req.body);
    let resModel = await objFuncion.aggregateFuncion(reqFuncionId);
    let data = (resModel) ? funcionDTO.templateExistFunction(resModel) : funcionDTO.templateNotFunctions();
    if(data.status == 404) return res.status(data.status).json(data);
    data = (resModel.asientos.length == 0) ? funcionDTO.templateNotSeating() : funcionDTO.templateSeating(resModel);
    if(data.status == 404) return res.status(data.status).json(data);
    let mongoUser = usuarioDTO.mongoUserToObject(process.env.VITE_MONGO_USER);
    mongoUser = await objUsuario.findOneClienteByNickOrEmail(mongoUser);
    let price = 0
    for(const asiento of req.body.asientos){
        data = (resModel.asientos.includes(asiento)) ? funcionDTO.templateSeating(resModel) : funcionDTO.templateNotSeating();
        if(data.status == 404) return res.status(data.status).json(data);
        resModel = (asiento.includes(resModel.preferencial)) ? funcionDTO.precioPreferencial(resModel) : funcionDTO.templateContinueWithSameObj(resModel);
       
        resModel = (mongoUser.tipo == "VIP") ? funcionDTO.precioVip(resModel) : funcionDTO.templateContinueWithSameObj(resModel);
        data = (resModel) ? funcionDTO.templateAsientoPrice(resModel.precio) : funcionDTO.templateFuncionError(resModel);
        if(data.status == 500) return res.status(data.status).json(data);
        price += data.precio
    }
    data = funcionDTO.templateAsientosPrice(price)
    res.status(data.status).json(data);
}

const verificarPrecioAsiento = async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()});
    let funcionDTO = new FuncionDTO();
    let usuarioDTO = new UsuarioDTO();
    let objFuncion = new Funcion();
    let objUsuario = new Cliente();
    let reqFuncionId = funcionDTO.fromHexStringToObjectId(req.query);
    let resModel = await objFuncion.aggregateFuncion(reqFuncionId);
    let data = (resModel) ? funcionDTO.templateExistFunction(resModel) : funcionDTO.templateNotFunctions();
    if(data.status == 404) return res.status(data.status).json(data);
    data = (resModel.asientos.length == 0) ? funcionDTO.templateNotSeating() : funcionDTO.templateSeating(resModel);
    if(data.status == 404) return res.status(data.status).json(data);
    data = (resModel.asientos.includes(req.query.asiento)) ? funcionDTO.templateSeating(resModel) : funcionDTO.templateNotSeating();
    if(data.status == 404) return res.status(data.status).json(data);
    resModel = (req.query.asiento.includes(resModel.preferencial)) ? funcionDTO.precioPreferencial(resModel) : funcionDTO.templateContinueWithSameObj(resModel);
    let mongoUser = usuarioDTO.mongoUserToObject(process.env.VITE_MONGO_USER);
    mongoUser = await objUsuario.findOneClienteByNickOrEmail(mongoUser);
    resModel = (mongoUser.tipo == "VIP") ? funcionDTO.precioVip(resModel) : funcionDTO.templateContinueWithSameObj(resModel);
    data = (resModel) ? funcionDTO.templateAsientoPrice(resModel.precio) : funcionDTO.templateFuncionError(resModel);
    if(data.status == 500) return res.status(data.status).json(data);
    res.status(data.status).json(data);
}

module.exports = {
    insertFuncion,
    verificarDisponibilidadAsientos,
    verificarAsientos,
    verificarPrecioAsiento,
    verificarPrecioAsientos
}