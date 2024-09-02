const { validationResult } = require('express-validator');
const TarjetaDTO = require('../dto/tarjeta.dto.cjs')
const UsuarioDTO = require('../dto/usuario.dto.cjs')
const Tarjeta = require('../model/tarjeta.model.cjs');
const Cliente = require('../model/usuario.model.cjs')

//-----------------------------------------------------------------------------------------------------------------------------

const crearTarjeta = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({errors: errors.array()});
    const tarjetaDTO = new TarjetaDTO();
    const usuarioDTO = new UsuarioDTO();
    const objTarjeta = new Tarjeta();
    const objCliente = new Cliente();
    let reqObjectId = tarjetaDTO.fromHexStringToObjectId(req.body)
    let data = tarjetaDTO.usuarioIdToIdKey({...reqObjectId});
    let resModel = await objCliente.findOneClienteById(data);
    data = (resModel) ? usuarioDTO.templateExistUser(resModel) : usuarioDTO.templateNotUsers();
    if(data.status == 404) return res.status(data.status).json(data);
    let usuario = resModel
    if(data.status == 200) resModel = await objTarjeta.findOneTarjetaByNumber(req.body);
    data = (resModel) ? tarjetaDTO.templareTarjetaDuplicated(resModel) : tarjetaDTO.templateNotCards();
    if(data.status == 409) return res.status(data.status).json(data);
    let mongoUser = usuarioDTO.mongoUserToObject(process.env.MONGO_USER);
    resModel = await objCliente.findOneClienteByNickOrEmail(mongoUser);
    if(resModel.tipo != "Admin"){
        data = (process.env.MONGO_USER != usuario.nick) ? tarjetaDTO.templateBadCredentials() : tarjetaDTO.templateContinue();
        if(data.status == 401) return res.status(data.status).json(data);
    }
    data = (usuario.tipo == "Estandar") ? tarjetaDTO.templateContinue() : usuarioDTO.templateBadRequest();
    if(data.status == 400) return res.status(data.status).json(data);
    usuario = usuarioDTO.typeToRole(usuario);
    let newUsuario = usuarioDTO.changeRole({...usuario});
    resModel = await objCliente.revokeRolesFromUsuario(usuario);
    data = (resModel.ok) ? usuarioDTO.templateExistUser(resModel) : usuarioDTO.templateUserError(resModel);
    if(data.status == 500) return res.status(data.status).json(data);
    if(data.status == 200) resModel = await objCliente.grantRolesToUsuario(newUsuario)
    data = (resModel.ok) ? usuarioDTO.templateExistUser(resModel) : usuarioDTO.templateUserError(resModel)
    if(data.status == 500) return res.status(data.status).json(data);
    if(data.status == 200) newUsuario = usuarioDTO.roleToType(newUsuario);
    resModel = await objCliente.updateCliente(newUsuario);
    data = (resModel.modifiedCount) ? usuarioDTO.templateExistUser(resModel) : usuarioDTO.templateUserError(resModel);
    if(data.status == 500) return res.status(data.status).json(data);
    if(data.status == 200) resModel = await objTarjeta.insertTarjeta(reqObjectId);
    data = (resModel.acknowledged) ? tarjetaDTO.templateTarjetaSaved(reqObjectId) : tarjetaDTO.templateTarjetaError(resModel);
    if(data.status == 500) return res.status(data.status).json(data);
    res.status(data.status).json(data);
}




module.exports = {
    crearTarjeta
}