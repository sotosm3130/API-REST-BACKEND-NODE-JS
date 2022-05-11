const { matchedData } = require('express-validator');
const {tracksModel} = require('../models');
const {handleHttpError} = require('../utils/handleError')

/**
 * Obtener una lista de datos
 * @param {*} req 
 * @param {*} res 
 */
const getItems = async (req, res) =>{

    try {
        const user = req.user

        const data = await tracksModel.find({})
        res.send({user , data})

    }catch(e){
        handleHttpError(res,"ERROR_EN_GET_ITEMS")
    }
    
    
}

/**
 * Obtener un detalle
 * @param {*} req 
 * @param {*} res 
 */
const getItem = async (req, res) =>{
    try{
        req = matchedData(req);
        const {id} = req;
        const data = await tracksModel.findById(id)
        res.send({data})

    }catch(e){
        handleHttpError(res,"ERROR_EN_GET_ITEM")
    }
}

/**
 * Insertar un registro
 * @param {*} req 
 * @param {*} res 
 */
const createItems = async (req, res) =>{
    try {

        const body = matchedData(req)
        const data = await tracksModel.create(body)
        res.send({data})

    }catch(e){
        handleHttpError(res,"ERROR_EN_CREATE_ITEMS")
    }

    
}

/**
 * Actualizar un registro
 * @param {*} req 
 * @param {*} res 
 */
const updateItems = async (req, res) =>{
    try {

        const {id, ...body} = matchedData(req)
        const data = await tracksModel.findOneAndUpdate(
            id, body
        )
        res.send({data})

    }catch(e){
        handleHttpError(res,"ERROR_EN_UPDATE_ITEMS")
    }
}

/**
 * Elimnar un registro
 * @param {*} req 
 * @param {*} res 
 */
const deleteItems = async (req, res) =>{
    try{
        req = matchedData(req);
        const {id} = req;
        const data = await tracksModel.delete({_id:id})
        res.send({data})

    }catch(e){
        handleHttpError(res,"ERROR_EN_DELETE_ITEM")
    }
}



module.exports = {getItems, getItem,createItems,updateItems,deleteItems}