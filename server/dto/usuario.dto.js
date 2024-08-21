module.exports = class UsuarioDTO {
    typeToRole(arg){
        if(arg.tipo == "Admin"){
            arg.tipo = "Administrador"
        } else if(arg.tipo == "Estandar"){
            arg.tipo = "usuarioEstandar"
        } else if(arg.tipo == "VIP"){
            arg.tipo = "usuarioVIP"
        }
        return {
            ...arg,
            tipo: arg.tipo
        }
    }

    roleToType(arg){
        if(arg.tipo == "Administrador"){
            arg.tipo = "Admin"
        } else if(arg.tipo == "usuarioEstandar"){
            arg.tipo = "Estandar"
        } else if(arg.tipo == "usuarioVIP"){
            arg.tipo = "VIP"
        }
        return {
            ...arg,
            tipo: arg.tipo
        }
    }

    mongoUserToObject(arg){
        return {
            nick: arg
        }
    }

    changeRole(arg){
        if(arg.tipo == "usuarioEstandar"){
            arg.tipo = "usuarioVIP"
        } else if(arg.tipo == "usuarioVIP"){
            arg.tipo = "usuarioEstandar"
        }
        return {
            ...arg,
            tipo: arg.tipo
        }
    }

    templateNotUsers(){
        return {
            status: 404,
            message: "No hay usuarios registrados"
        }
    }

    templateUserError(arg){
        return {
            status: 500,
            message: "Ocurrio un error",
            data: arg
        }
    }

    templateExistUser(arg){
        return {
            status: 200,
            data: arg
        }
    }

    templateUserSaved(arg){
        return {
            status: 201,
            data: arg
        }
    }

    templateListUsers(arg){
        return {
            status: 200,
            data: arg
        }
    }

    templateBadRequest(){
        return {
            status: 400,
            message: "La consulta esta mal diseñada"
        }
    }
}