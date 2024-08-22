const { query, body, param } = require("express-validator");

exports.funcionValidationRulesAsientos = () => {
    return [
        query('_id', 'El id de la funcion no se envio').notEmpty().isMongoId().withMessage('El id tiene que ser un hexadecimal')
    ]
}