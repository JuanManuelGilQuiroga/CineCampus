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
}