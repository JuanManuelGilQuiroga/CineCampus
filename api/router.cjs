const router = require('express').Router();
const { listarTodosLosUsuarios, listarUsuariosPorTipo, crearUsuario } = require('./controller/usuario.controller');
const { usuarioValidationRulesCreation, usuarioValidationRulesFindType, usuarioValidationEmpty } = require('./validators/usuario.validator');
const { crearTarjeta } = require('./controller/tarjeta.controller');
const { tarjetaValidationRulesCreation } = require('./validators/tarjeta.validator');
const { verificarAsientos, verificarPrecioAsiento } = require('./controller/funcion.controller')
const { funcionValidationRulesAsientos, funcionValidationRulesAsientoPrice } = require('./validators/funcion.validator');
const { listarPeliculas, detallesPelicula, listarPeliculasSinDetalles } = require('./controller/pelicula.controller');
const { peliculaValidationEmpty, peliculaValidationRulesDetalles } = require('./validators/pelicula.validator');
const { crearBoleta } = require('./controller/boleta.controller');
const { boletaValidatorRulesCreation } = require('./validators/boleta.validator');
const { crearMovimiento } = require('./controller/movimiento.controller');
const { movimientoValidationRulesCreation } = require('./validators/movimiento.validator');

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