const { ObjectId } = require("mongodb");

module.exports = class BoletaDTO {
    usuarioIdToIdKey(arg){
        arg._id = arg.cliente_id
        delete arg.cliente_id
        return arg;
    }

    templateTicketSaved(arg){
        return {
            status: 201,
            data: arg
        }
    }

    templateTicketError(arg){
        return {
            status: 500,
            message: "Ocurrio un error",
            data: arg
        }
    }
}