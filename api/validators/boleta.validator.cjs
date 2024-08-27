const { query, body, param } = require("express-validator");

exports.boletaValidatorRulesCreation = () => {
    return [
        body('movimiento_id', 'El id del movimiento no se envio').notEmpty().isMongoId().withMessage('El id del movimiento tiene que ser un hexadecimal'),
        body('funcion_id', 'El id de la funcion no se envio').notEmpty().isMongoId().withMessage('El id de la funcion tiene que ser un hexadecimal'),
        body('asiento', 'El asiento no se envio').notEmpty().matches(/^[A-F][1-9]$/).withMessage('El campo debe cumplir con el formato: dos dígitos, una letra mayúscula de la A a la F, seguido de un número entre 1 y 9')
    ]
}