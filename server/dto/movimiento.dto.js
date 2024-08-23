module.exports = class MovimientoDTO {
    movimientoIdToIdKey(arg){
        arg._id = arg.movimiento_id
        delete arg.movimiento_id
        return arg;
    }  
}