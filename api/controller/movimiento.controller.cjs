const { validationResult } = require('express-validator');
const Boleta = require('../model/boleta.model.cjs');
const Funcion = require('../model/funcion.model.cjs');
const Cliente = require('../model/usuario.model.cjs');
const Movimiento = require('../model/movimiento.model.cjs');
const MovimientoDTO = require('../dto/movimiento.dto.cjs');
const UsuarioDTO = require('../dto/usuario.dto.cjs');
const FuncionDTO = require('../dto/funcion.dto.cjs');
const { verificarPrecioAsiento, verificarPrecioAsientos } = require('./funcion.controller.cjs');

//--------------------------------------------------------------------------------------------------------

const crearMovimiento = async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()});
    let movimientoDTO = new MovimientoDTO();
    let usuarioDTO = new UsuarioDTO();
    let funcionDTO = new FuncionDTO();
    let objMovimiento = new Movimiento();
    let objUsuario = new Cliente();
    
    let reqUsuarioId = usuarioDTO.usuarioIdToIdKey(req.body);
    reqUsuarioId = funcionDTO.fromHexStringToObjectId(reqUsuarioId);
    let resModel = await objUsuario.findOneClienteById({...reqUsuarioId});
    let data = (resModel) ? usuarioDTO.templateExistUser(resModel) : usuarioDTO.templateNotUsers();
    if(data.status == 404) return res.status(data.status).json(data);

    data = (resModel.nick != process.env.VITE_MONGO_USER) ? usuarioDTO.templateBadCredentials() : usuarioDTO.templateContinue();
    if(data.status == 401) return res.status(data.status).json(data);

    let reqFuncionId = funcionDTO.funcionIdToIdKey(req.body);
    let simulatedReq = {
        body: {
            _id: reqFuncionId._id,
            asientos: req.body.asientos
        }
    };
    let reqAsiento = req.body.asientos;
    let simulatedRes = {
        status: function(code) {
            this.statusCode = code;
            return this;
        },
        json: function(data) {
            this.data = data;
            return this;
        }
    };
    if(typeof req.body.asientos == "object"){
        await verificarPrecioAsientos(simulatedReq, simulatedRes);
    } else if(typeof req.body.asientos == "string"){
        await verificarPrecioAsientos(simulatedReq, simulatedRes)
    }
    let precioPagar = simulatedRes
    data = (req.body.monto_COP != precioPagar.data.precio) ? funcionDTO.templateIncorrectPaymente() : funcionDTO.templateContinue();
    if(data.status == 400) return res.status(data.status).json(data);
    reqUsuarioId = usuarioDTO.idKeyToUsuarioId(reqUsuarioId);
    reqUsuarioId = movimientoDTO.fromHexStringToObjectId(reqUsuarioId)
    resModel = await objMovimiento.insertMovimiento({cliente_id: reqUsuarioId.cliente_id, monto_COP: req.body.monto_COP});
    data = (resModel.acknowledged) ? movimientoDTO.templateMovimientoSaved({_id: resModel.insertedId, cliente_id: reqUsuarioId.cliente_id, monto_COP: req.body.monto_COP}) : movimientoDTO.templateMovimientoError(resModel);
    if(data.status == 500) return res.status(data.status).json(data);
    return res.status(data.status).json(data);
}

module.exports = {crearMovimiento}
