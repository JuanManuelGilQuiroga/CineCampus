const { query, body, param } = require("express-validator");

exports.movimientoValidationRulesCreation = () => {
    return [
        body('cliente_id', 'El id del cliente no se envio').notEmpty().isMongoId().withMessage('El id del cliente debe ser un hexadecimal'),
        body('monto_COP', 'El monto a pagar no se envio').notEmpty().isInt().withMessage('El monto a pagar tiene que ser un numero entero'),
        body('funcion_id', 'El id de la funcion no se envio').notEmpty().isMongoId().withMessage('El id de la funcion tiene que ser un hexadecimal'),
        body('asiento', 'El asiento no se envio').notEmpty().matches(/^[A-F][1-9]$/).withMessage('El campo debe cumplir con el formato: dos dígitos, una letra mayúscula de la A a la F, seguido de un número entre 1 y 9')
    ]
}