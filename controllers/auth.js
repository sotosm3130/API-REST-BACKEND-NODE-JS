const { matchedData } = require('express-validator');
const {tokenSign} = require("../utils/handleJwt")
const {encrypt, compare} = require("../utils/handlePassword")
const {userModel} = require("../models")
const {handleHttpError} = require('../utils/handleError');


/**
 * Este controlador es el encargado de registrar usuarios
 * @param {*} req 
 * @param {*} res 
 */
const registerCtrl = async (req,res) => {
    try{

        req = matchedData(req)
        const password = await encrypt(req.password);
        const body = {...req, password}
        const dataUser = await userModel.create(body)
        dataUser.set('password', undefined, {strict:false})

        const data = {
            token: await tokenSign(dataUser),
            user: dataUser
        }

        res.send({data})

    }catch(e){
        handleHttpError(res,"ERROR_EN_REGISTRAR_USUARIO")
    }
}


/**
 * Este controlador es el encargado de logear a una persona
 * @param {*} req 
 * @param {*} res 
 */
const loginCtrl = async (req, res) => {
    try{
        req = matchedData(req)
        const user = await userModel.findOne({email:req.email})
        .select('password name role email');
        if(!user){
            handleHttpError(res, "USER_NOT_EXISTS", 404);
            return
        }

        const hashPasword = user.get('password');
        const check = await compare(req.password, hashPasword);

        if(!check){

            handleHttpError(res, "PASSWORD_INVALID", 401);
            return
        }

        user.set('password', undefined, {strict:false})
        const data = {
            token: await tokenSign(user),
            user
        }

        res.send({data})


    }catch(e){
        handleHttpError(res,"ERROR_EN_LOGIN_USUARIO")
    }
}

module.exports = {registerCtrl, loginCtrl}