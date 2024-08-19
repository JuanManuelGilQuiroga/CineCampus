const router = require('express').Router();
//const path = require('path');
const { listarTodosLosUsuarios, listarUsuariosPorTipo } = require('./controller/usuario.controller');
const {  usuarioValidationRulesCreation, usuarioValidationRulesFindType, usuarioValidationEmpty } = require('./validators/usuario.validator');


router.get("/users/v1", usuarioValidationRulesFindType(), listarUsuariosPorTipo);
router.get("/users/v2", usuarioValidationEmpty(), listarTodosLosUsuarios);


module.exports = router;