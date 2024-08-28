const router = require('express').Router();
const { listarTodosLosUsuarios, listarUsuariosPorTipo, crearUsuario } = require('./controller/usuario.controller.cjs');
const { usuarioValidationRulesCreation, usuarioValidationRulesFindType, usuarioValidationEmpty } = require('./validators/usuario.validator.cjs');
const { crearTarjeta } = require('./controller/tarjeta.controller.cjs');
const { tarjetaValidationRulesCreation } = require('./validators/tarjeta.validator.cjs');
const { verificarAsientos, verificarPrecioAsiento } = require('./controller/funcion.controller.cjs')
const { funcionValidationRulesAsientos, funcionValidationRulesAsientoPrice } = require('./validators/funcion.validator.cjs');
const { listarPeliculas, detallesPelicula, listarPeliculasSinDetalles } = require('./controller/pelicula.controller.cjs');
const { peliculaValidationEmpty, peliculaValidationRulesDetalles } = require('./validators/pelicula.validator.cjs');
const { crearBoleta } = require('./controller/boleta.controller.cjs');
const { boletaValidatorRulesCreation } = require('./validators/boleta.validator.cjs');
const { crearMovimiento } = require('./controller/movimiento.controller.cjs');
const { movimientoValidationRulesCreation } = require('./validators/movimiento.validator.cjs');

router.post("/users/v1", usuarioValidationRulesCreation(), crearUsuario);
router.get("/users/v2", usuarioValidationRulesFindType(), listarUsuariosPorTipo);
router.get("/users/v3", usuarioValidationEmpty(), listarTodosLosUsuarios);
router.post("/cards/v1", tarjetaValidationRulesCreation(), crearTarjeta);
router.get("/functions/v1", funcionValidationRulesAsientos(), verificarAsientos);
router.get("/functions/v2", funcionValidationRulesAsientoPrice(), verificarPrecioAsiento)
router.get("/movies/v1", peliculaValidationEmpty(), listarPeliculas);
router.get("/movies/v2", peliculaValidationRulesDetalles(), detallesPelicula);
router.get("/movies/v3", peliculaValidationEmpty(), listarPeliculasSinDetalles);
router.post("/tickets/v1", boletaValidatorRulesCreation(), crearBoleta);
router.post("/payments/v1", movimientoValidationRulesCreation(), crearMovimiento);

module.exports = router;
