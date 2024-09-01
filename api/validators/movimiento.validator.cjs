const { query, body, param } = require("express-validator");

exports.movimientoValidationRulesCreation = () => {
    return [
        body('cliente_id', 'El id del cliente no se envio').notEmpty().isMongoId().withMessage('El id del cliente debe ser un hexadecimal'),
        body('monto_COP', 'El monto a pagar no se envio').notEmpty().isInt().withMessage('El monto a pagar tiene que ser un numero entero'),
        body('funcion_id', 'El id de la funcion no se envio').notEmpty().isMongoId().withMessage('El id de la funcion tiene que ser un hexadecimal'),
        body('asientos', 'El asiento/asientos no se envio').notEmpty().withMessage('El campo debe ser o un array de strings o un string')
    ]
}