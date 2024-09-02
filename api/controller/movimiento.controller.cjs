const { validationResult } = require('express-validator');
const Boleta = require('../model/boleta.model.cjs');
const Funcion = require('../model/funcion.model.cjs');
const Cliente = require('../model/usuario.model.cjs');
const Movimiento = require('../model/movimiento.model.cjs');
const MovimientoDTO = require('../dto/movimiento.dto.cjs');
const UsuarioDTO = require('../dto/usuario.dto.cjs');
const FuncionDTO = require('../dto/funcion.dto.cjs');
const { verificarPrecioAsiento, verificarPrecioAsientos } = require('./funcion.controller.cjs');

/**
 * Inserta un movimiento de pago en la base de datos.
 * @param {Object} movimientoParametro - Objeto que contiene los detalles del movimiento a insertar.
 * @property {ObjectId} boleta_id - El ID de la boleta asociada al movimiento.
 * @property {int} monto_COP - El monto a pagar
 *
 * @returns {Promise<Object>} Una promesa que resuelve con el resultado de la inserción.
 */
const insertMovimiento = async (movimientoParametro) => {
    let movimientoInstance = new Movimiento()
    let boletaInstance = new Boleta()
    let clienteInstance = new Cliente()
    let funcionInstance = new Funcion()

    // Busca si ya existe un movimiento asociado a la boleta
    let findMovimiento = await movimientoInstance.findOneMovimiento({
        boleta_id: movimientoParametro.boleta_id
    })
    // Busca la boleta asociada al movimiento
    let findBoleta = await boletaInstance.findOneBoleta({
        _id: movimientoParametro.boleta_id
    })
    if(!findBoleta) {
        return { error: "La boleta no existe en la base de datos." }
    } else if(findMovimiento) {
        return { error: "La boleta ya esta paga." }
    }

    let findCliente = await clienteInstance.findOneCliente({
        _id: findBoleta.cliente_id
    })
    let findFuncion = await funcionInstance.findFuncionById({
        _id: findBoleta.funcion_id
    })

    // Verifica que el monto del movimiento coincida con el precio esperado para clientes VIP
    let precioBoletaVIP = findFuncion.precio_COP*0.80
    if(findCliente.tipo == "VIP" && movimientoParametro.monto_COP != precioBoletaVIP) {
        return { error: "El monto de la boleta no coincide con el monto del cliente. Recuerde que por ser cliente VIP tiene un descuento del 20%. Dirijase a pagar la boleta directamente." }
    } else if(findCliente.tipo == "Estandar" && movimientoParametro.monto_COP != findFuncion.precio_COP) {
        return { error: "El monto de la boleta no coincide con el monto del cliente. Dirijase a pagar la boleta directamente." }
    }

    // Inserta el movimiento en la base de datos
    let res = await movimientoInstance.insertMovimiento(movimientoParametro)
    let movimientoId = res.insertedId
    findMovimiento = await movimientoInstance.findOneMovimiento({
        _id: movimientoId
    })
    console.log(findMovimiento)

    // Actualiza el estado de pago de la boleta
    let updateBoletaEstadoPago = await boletaInstance.updateBoleta(
        {_id: movimientoParametro.boleta_id},
        {$set: {estado_pago: true}}
    )

    return res
}

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
    console.log(reqUsuarioId)
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
        await verificarPrecioAsiento(simulatedReq, simulatedRes)
    }
    let precioPagar = simulatedRes
    data = (req.body.monto_COP != precioPagar.data.precio) ? funcionDTO.templateIncorrectPaymente() : funcionDTO.templateContinue();
    if(data.status == 400) return res.status(data.status).json(data);
    reqUsuarioId = usuarioDTO.idKeyToUsuarioId(reqUsuarioId);
    reqUsuarioId = movimientoDTO.fromHexStringToObjectId(reqUsuarioId)
    console.log(reqUsuarioId)
    resModel = await objMovimiento.insertMovimiento({cliente_id: reqUsuarioId.cliente_id, monto_COP: req.body.monto_COP});
    data = (resModel.acknowledged) ? movimientoDTO.templateMovimientoSaved({_id: resModel.insertedId, cliente_id: reqUsuarioId.cliente_id, monto_COP: req.body.monto_COP}) : movimientoDTO.templateMovimientoError(resModel);
    if(data.status == 500) return res.status(data.status).json(data);
    return res.status(data.status).json(data);
}

module.exports = {insertMovimiento, crearMovimiento}
