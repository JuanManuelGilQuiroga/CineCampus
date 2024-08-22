const router = require('express').Router();
const { listarTodosLosUsuarios, listarUsuariosPorTipo, crearUsuario } = require('./controller/usuario.controller');
const { usuarioValidationRulesCreation, usuarioValidationRulesFindType, usuarioValidationEmpty } = require('./validators/usuario.validator');
const { crearTarjeta } = require('./controller/tarjeta.controller');
const { tarjetaValidationRulesCreation } = require('./validators/tarjeta.validator');
const { verificarAsientos } = require('./controller/funcion.controller')
const { funcionValidationRulesAsientos } = require('./validators/funcion.validator');
const { listarPeliculas } = require('./controller/pelicula.controller');
const { peliculaValidationEmpty } = require('./validators/pelicula.validator');

router.post("/users/v1", usuarioValidationRulesCreation(), crearUsuario);
router.get("/users/v2", usuarioValidationRulesFindType(), listarUsuariosPorTipo);
router.get("/users/v3", usuarioValidationEmpty(), listarTodosLosUsuarios);
router.post("/cards/v1", tarjetaValidationRulesCreation(), crearTarjeta);
router.get("/functions/v1", funcionValidationRulesAsientos(), verificarAsientos);
router.get("/movies/v1", peliculaValidationEmpty(), listarPeliculas)

module.exports = router;