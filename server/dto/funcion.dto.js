const { ObjectId } = require("mongodb")

module.exports = class FuncionDTO {
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
}