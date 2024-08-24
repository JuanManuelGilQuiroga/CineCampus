const { ObjectId } = require("mongodb");

module.exports = class MovimientoDTO {
    movimientoIdToIdKey(arg){
        arg._id = arg.movimiento_id
        delete arg.movimiento_id
        return arg;
    }  

    fromHexStringToObjectId(arg){
        arg.cliente_id = new ObjectId(arg.cliente_id)
        return arg
    }

    fromHexStringToObjectIdMovimiento(arg){
        arg.movimiento_id = new ObjectId(arg.movimiento_id)
        return arg
    }

    templateExistMovimiento(arg){
        return {
            status: 200,
            data: arg
        }
    }

    templateNotMovimiento(){
        return {
            status: 404,
            message: "No hay movimientos registrados"
        }
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