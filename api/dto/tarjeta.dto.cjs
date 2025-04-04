const {ObjectId} = require('mongodb')

module.exports = class TarjetaDTO {
    usuarioIdToIdKey(arg){
        arg._id = arg.cliente_id
        delete arg.cliente_id
        return arg;
    }

    fromHexStringToObjectId(arg){
        arg.cliente_id = new ObjectId(arg.cliente_id)
        return arg
    }

    templateNotCards(){
        return {
            status: 404,
            message: "No hay tarjetas registradas"
        }
    }

    templateExistCard(arg){
        return {
            status: 200,
            data: arg
        }
    }

    templateTarjetaSaved(arg){
        return {
            status: 201,
            data: arg
        }
    }

    templareTarjetaDuplicated(){
        return {
            status: 409,
            message: "Ya existe una tarjeta con este numero"
        }
    }

    templateTarjetaError(arg){
        return {
            status: 500,
            message: "Ocurrio un error",
            data: arg
        }
    }

    templateBadCredentials(){
        return {
            status: 401,
            message: "Sus credenciales no son validas para realizar este proceso"
        }
    }

    templateContinue(){
        return {
            status: 100,
            message: "Todo va bien, continue con el proceso"
        }
    }
}