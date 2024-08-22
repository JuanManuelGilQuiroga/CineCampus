const { ObjectId } = require("mongodb");

module.exports = class BoletaDTO {
    usuarioIdToIdKey(arg){
        arg._id = arg.cliente_id
        delete arg.cliente_id
        return arg;
    }

    
}