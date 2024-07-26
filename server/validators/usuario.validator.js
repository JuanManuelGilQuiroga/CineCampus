const { body, query, param } = require("express-validator");

exports.usuarioValidationRules = () => {
    return [
        body('nombre').notEmpty().isString().withMessage('El nombre es obligatorio'),
        body('apellido').notEmpty().isString().withMessage('El apellido es obligatorio'),
        body('nick').notEmpty().isString().withMessage('El nick es obligatorio'),
        body('pwd').notEmpty().isString().withMessage('La contraseña es obligatoria'),
        body('email').notEmpty().isEmail().withMessage('El email es obligatorio'),
        body('telefono').notEmpty().isString().withMessage('El telefono es obligatorio'),
    ]
}

    nombre: "Juan",
    apellido: "Gil",
    nick: "juanMGQ",
    pwd: "jmgqEstandar",
    email: "jmgq2007@gmail.com",
    telefono: "315 6431235",
    tipo: "Estandar",
    numero_tarjeta: "1234 5678 9012 3456"