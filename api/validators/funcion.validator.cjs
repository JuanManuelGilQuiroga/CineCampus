const { query, body, param } = require("express-validator");

exports.funcionValidationRulesAsientos = () => {
    return [
        query('_id', 'El id de la funcion no se envio').notEmpty().isMongoId().withMessage('El id tiene que ser un hexadecimal')
    ]
}

exports.funcionValidationRulesAsientoPrice = () => {
    return [
        body('_id', 'El id de la funcion no se envio').notEmpty().isMongoId().withMessage('El id tiene que ser un hexadecimal'),
        body('asiento', 'El asiento no se envio').notEmpty().matches(/^[A-F][1-9]$/).withMessage('El campo debe cumplir con el formato: dos dígitos, una letra mayúscula de la A a la F, seguido de un número entre 1 y 9')
    ]
}