const { query, body, param } = require("express-validator");

exports.tarjetaValidationRulesCreation = () => {
    return [
        body('cliente_id', 'El id del cliente no se envio').notEmpty().isMongoId().withMessage('El Id del usuario es obligatorio'),
        body('numero', 'El numero de la tarjeta no se envio').notEmpty().isString().withMessage('El numero tiene que ser un string').isLength({min: 16, max:16}).withMessage('El numero tiene que ser de 16 digitos').matches(/^\d+$/).withMessage('La tarjeta debe contener solo números')
    ]
}