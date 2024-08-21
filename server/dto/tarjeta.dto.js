module.exports = class TarjetaDTO {
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