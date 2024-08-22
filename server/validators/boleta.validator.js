const { query, body, param } = require("express-validator");

exports.boletaValidatorRulesCreation = () => {
    return [
        body('cliente_id', 'El id del cliente no se envio').notEmpty().isMongoId().withMessage('El id del cliente tiene que ser un hexadecimal'),
        body('funcion_id', 'El id de la funcion no se envio').notEmpty().isMongoId().withMessage('El id de la funcion tiene que ser un hexadecimal'),
        body('asiento', 'El asiento no se envio').notEmpty.matches(/^[A-F](1-5|1-7|1-9)\d{2}$/).withMessage('El campo debe cumplir con el formato: dos dígitos, una letra mayúscula de la A a la F, seguido de un número entre 1 y 5 para la letra A, entre 1 y 7 para la letra B, y entre 1 y 9 para las letras posteriores.'),
        body('estado_pago', 'El estado del pago no se envio').notEmpty().isBoolean().withMessage('El campo estado_pago tiene que ser booleano'),
        body('monto_COP').optional().isInt().withMessage('El campo monto debe ser un numero entero')
    ]
}