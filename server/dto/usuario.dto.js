module.exports = class UsuarioDTO {
    templateNotUsers(){
        return {
            status: 404,
            message: "No hay usuarios registrados"
        }
    }

    templateListUsers(arg){
        return {
            status: 200,
            data: arg
        }
    }
}