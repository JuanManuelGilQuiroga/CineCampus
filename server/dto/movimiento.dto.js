module.exports = class MovimientoDTO {
    movimientoIdToIdKey(arg){
        arg._id = arg.movimiento_id
        delete arg.movimiento_id
        return arg;
    }  

    templateMovimientoSaved(arg){
        return {
            status: 201,
            data: arg
        }
    }

    templateMovimientoError(arg){
        return {
            status: 500,
            message: "Ocurrio un error",
            data: arg
        }
    }
}