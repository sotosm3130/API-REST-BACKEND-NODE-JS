const bcryptjs = require("bcryptjs")


/**
 * Constraseña sin encriptar
 * @param {*} passwordPlain 
 */
const encrypt = async (passwordPlain) =>{
    const hash = await bcryptjs.hash(passwordPlain, 10)
    return hash
}

/**
 * Pasar contraseña sin encriptar y pasar contraseña encriptada
 * @param passwordPlain 
 * @param hashPasword 
 */
const compare = async (passwordPlain, hashPasword) => {
    return await bcryptjs.compare(passwordPlain, hashPasword)
}


module.exports = {encrypt, compare};