const { validationResult } = require('express-validator');
const { ObjectId } = require('mongodb');
const Pelicula = require('../model/pelicula.model.cjs');
const Sala = require('../model/sala.model.cjs');
const Funcion = require('../model/funcion.model.cjs');
const FuncionDTO = require('../dto/funcion.dto.cjs');
const Cliente = require('../model/usuario.model.cjs');
const UsuarioDTO = require('../dto/usuario.dto.cjs');

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
    if(req.body.asientos.length == 0){ 
        data = funcionDTO.templatePrecioCero();
        return res.status(data.status).json(data)
    }
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
    let reqFuncionId = funcionDTO.fromHexStringToObjectId(req.body);
    let resModel = await objFuncion.aggregateFuncion(reqFuncionId);
    let data = (resModel) ? funcionDTO.templateExistFunction(resModel) : funcionDTO.templateNotFunctions();
    if(data.status == 404) return res.status(data.status).json(data);
    data = (resModel.asientos.length == 0) ? funcionDTO.templateNotSeating() : funcionDTO.templateSeating(resModel);
    if(data.status == 404) return res.status(data.status).json(data);
    let mongoUser = usuarioDTO.mongoUserToObject(process.env.VITE_MONGO_USER);
    mongoUser = await objUsuario.findOneClienteByNickOrEmail(mongoUser);

    data = (resModel.asientos.includes(req.body.asientos)) ? funcionDTO.templateSeating(resModel) : funcionDTO.templateNotSeating();
    if(data.status == 404) return res.status(data.status).json(data);
    resModel = 

    resModel = (req.body.asientos.includes(resModel.preferencial)) ? funcionDTO.precioPreferencial(resModel) : funcionDTO.templateContinueWithSameObj(resModel);
    resModel = (mongoUser.tipo == "VIP") ? funcionDTO.precioVip(resModel) : funcionDTO.templateContinueWithSameObj(resModel);
    data = (resModel) ? funcionDTO.templateAsientoPrice(resModel.precio) : funcionDTO.templateFuncionError(resModel);
    if(data.status == 500) return res.status(data.status).json(data);
    res.status(data.status).json(data);
}

module.exports = {
    verificarAsientos,
    verificarPrecioAsiento,
    verificarPrecioAsientos
}