const { ObjectId } = require("mongodb")

module.exports = class FuncionDTO {
    precioPreferencial(arg){
        arg.precio = arg.precio+((arg.precio)*0.2)
        return arg
    }

    precioVip(arg){
        arg.precio = arg.precio-((arg.precio)*0.2)
        return arg
    }

    funcionIdToIdKey(arg){
        arg._id = arg.funcion_id
        delete arg.funcion_id
        return arg;
    }

    fromHexStringToObjectId(arg){
        arg._id = ObjectId.createFromHexString(arg._id)
        return arg
    }

    templateExistFunction(arg){
        return {
            status: 200,
            data: arg
        }
    }

    templateNotFunctions(){
        return {
            status: 404,
            message: "No hay funciones registradas"
        }
    }

    templateNotSeating(){
        return {
            status: 404,
            message: "No hay asientos disponibles"
        }
    }

    templateSeating(arg){
        return {
            status: 200,
            data: arg
        }
    }

    templateContinueWithSameObj(arg){
        return arg
    }

    templateContinue(){
        return {
            status: 100,
            message: "Continue con el proceso"
        }
    }

    templateAsientoPrice(arg){
        return {
            status: 200,
            message: "El valor del asiento solicitado es el siguiente",
            data: arg
        }
    }

    templateFuncionError(arg){
        return {
            status: 500,
            message: "Ocurrio un error",
            data: arg
        }
    }
}