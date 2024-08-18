const router = require('express').Router();
const path = require('path');
const { listarUsuarios } = require('./controller/usuario.controller');
const {  usuarioValidationRulesCreation, usuarioValidationRulesFindType, usuarioValidationEmpty } = require('./validators/usuario.validator');

router.get("/users", (req, res) => {
    res.sendFile(path.join(req.__dirname, process.env.EXPRESS_STATIC, 'views/usuarios.html'));
})

router.get("/users/v1", usuarioValidationRulesFindType(), listarUsuarios);


module.exports = router;