const { ObjectId } = require('mongodb');
const Funcion = require('../model/funcion.model.cjs');
const { insertMovimiento } = require('./movimiento.controller.cjs');
const Cliente = require('../model/usuario.model.cjs');
const Boleta = require('../model/boleta.model.cjs');
const { validationResult } = require('express-validator');
const BoletaDTO = require('../dto/boleta.dto.cjs');
const FuncionDTO = require('../dto/funcion.dto.cjs');
const UsuarioDTO = require('../dto/usuario.dto.cjs');
const MovimientoDTO = require('../dto/movimiento.dto.cjs');
const Movimiento = require('../model/movimiento.model.cjs');

//--------------------------------------------------------------------------------------------------------------

const crearBoleta = async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()});
    let boletaDTO = new BoletaDTO();
    let funcionDTO = new FuncionDTO()
    let movimientoDTO = new MovimientoDTO();
    let objMovimiento = new Movimiento()
    let objBoleta = new Boleta();
    let objFuncion = new Funcion();

    let reqFuncionId = funcionDTO.fromHexStringToObjectIdFuncion({...req.body});
    reqFuncionId = funcionDTO.funcionIdToIdKey(reqFuncionId)
    let reqMovimientoId = movimientoDTO.fromHexStringToObjectIdMovimiento({...req.body});
    reqMovimientoId = movimientoDTO.movimientoIdToIdKey(reqMovimientoId)
    let reqBoleta = {movimiento_id: reqMovimientoId._id, funcion_id: reqFuncionId._id, asiento: req.body.asiento};
    
    let resModel = await objFuncion.findFuncionById(reqFuncionId);
    let data = (resModel) ? funcionDTO.templateExistFunction(resModel) : funcionDTO.templateNotFunctions();
    if(data.status == 404) return res.status(data.status).json(data);
    console.log(reqMovimientoId)
    if(data.status == 200) resModel = await objMovimiento.findOneMovimiento(reqMovimientoId);
    data = (resModel) ? movimientoDTO.templateExistMovimiento(resModel) : movimientoDTO.templateNotMovimiento();
    if(data.status == 404) return res.status(data.status).json(data);
    if(data.status == 200) resModel = await objBoleta.insertBoleta(reqBoleta)
    data = (resModel.acknowledged) ? boletaDTO.templateTicketSaved({_id: resModel.insertedId, ...reqBoleta}) : boletaDTO.templateTicketError(resModel);
    if(data.status == 500) return res.status(data.status).json(data);
    if(data.status == 201) resModel = objFuncion.updateFuncionQuitarAsiento(data.data);
    return res.status(data.status).json(data);
}

module.exports = { crearBoleta }