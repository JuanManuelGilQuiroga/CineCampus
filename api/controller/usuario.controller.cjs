const { validationResult } = require('express-validator');
const { insertTarjeta } = require('./tarjeta.controller.cjs');
const Usuario = require('../model/usuario.model.cjs');
const UsuarioDTO = require('../dto/usuario.dto.cjs');

//-----------------------------------------------------------------------------------------------------------------------------------

const crearUsuario = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors: errors.array() });
    const usuarioDTO = new UsuarioDTO();
    const obj = new Usuario();
    let resModel = await obj.findOneClienteByNickOrEmail(req.body);
    let data = (resModel) ? usuarioDTO.templateExistUser(resModel) : usuarioDTO.templateNotUsers();
    if(data.status == 200) return res.status(data.status).json(data);
    if(data.status == 404) resModel = await obj.saveUsuario(req.body);
    data = (resModel.acknowledged) ? usuarioDTO.templateUserSaved(req.body) : usuarioDTO.templateUserError(resModel);
    if(data.status == 500) return res.status(data.status).json(data);
    if(data.status == 201) data = usuarioDTO.typeToRole(req.body);
    if(data.tipo == "Administrador"){resModel = await obj.createUsuarioAdmin(data)} else{resModel = await obj.createUsuarioCliente(data)};
    data = (resModel.ok) ? usuarioDTO.templateUserSaved(req.body) : usuarioDTO.templateUserError(resModel);
    if(data.status == 500) return res.status(data.status).json(data);
    return res.status(data.status).json(data);
}

const listarUsuariosPorTipo = async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors: errors.array() });
    const usuarioDTO = new UsuarioDTO();
    const obj = new Usuario();
    let resModel = await obj.findClientesByType(req.query.tipo);
    let data = (resModel.length) ? usuarioDTO.templateListUsers(resModel) : usuarioDTO.templateNotUsers(resModel);
    return res.status(data.status).json(data);
}

const listarTodosLosUsuarios = async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors: errors.array() });
    const usuarioDTO = new UsuarioDTO();
    const obj = new Usuario();
    let resModel = await obj.findClientes();
    let data = (resModel.length) ? usuarioDTO.templateListUsers(resModel) : usuarioDTO.templateNotUsers(resModel);
    return res.status(data.status).json(data);
}

const buscarUnUsuario = async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors: errors.array() });
    const usuarioDTO = new UsuarioDTO();
    const obj = new Usuario();
    let resModel = await obj.findOneClienteByNickOrEmail(req.query);
    let data = (resModel) ? usuarioDTO.templateExistUser(resModel) : usuarioDTO.templateNotUsers();
    if(data.status == 404) return res.status(data.status).json(data);
    return res.status(data.status).json(data);
}


module.exports = {
    crearUsuario,
    listarUsuariosPorTipo,
    listarTodosLosUsuarios,
    buscarUnUsuario
}