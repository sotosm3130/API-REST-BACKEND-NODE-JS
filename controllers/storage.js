const fs = require("fs")
const { matchedData } = require('express-validator');
const {storagesModel} = require('../models');
const {handleHttpError} = require('../utils/handleError')
const PUBLIC_URL=process.env.PUBLIC_URL;
const MEDIA_PATH = `${__dirname}/../storage`
/**
 * Obtener una lista de datos
 * @param {*} req 
 * @param {*} res 
 */
const getItems = async (req, res) =>{
    
    try {
        const data = await storagesModel.find({})
        res.send({data})

    }catch(e){
        handleHttpError(res,"ERROR_EN_LIST_ITEMS")
    }
}

/**
 * Obtener un detalle
 * @param {*} req 
 * @param {*} res 
 */
const getItem = async (req, res) =>{
    try {
        
        const {id} = matchedData(req)
        const data = await storagesModel.findById(id)
        res.send({data})

    }catch(e){
        console.log(e)
        handleHttpError(res,"ERROR_EN_GET_ITEM")
    }
}

/**
 * Insertar un registro
 * @param {*} req 
 * @param {*} res 
 */
const createItems = async (req, res) =>{
    
    try{
        const {body, file } = req
        console.log(file)
        const fileData = {
        filename: file.filename,
        url:`${PUBLIC_URL}/${file.filename}`
        }
        const data = await storagesModel.create(fileData)
        res.send({data})
    }catch(e){
        handleHttpError(res,"ERROR_EN_CREATE_ITEMS")
    }
}

/**
 * Elimnar un registro
 * @param {*} req 
 * @param {*} res 
 */
const deleteItems = async (req, res) =>{
    try {
        
        const {id} = matchedData(req)
        const dataFile = await storagesModel.findById(id)
        await storagesModel.deleteOne({id})
        const {filename} = dataFile
        filepath = `${MEDIA_PATH}/${filename}`
        fs.unlinkSync(filepath)
        const data = {
            filepath,
            delete:1
        }
        res.send({data})


    }catch(e){
        console.log(e)
        handleHttpError(res,"ERROR_EN_DELETE_ITEM")
    }
}



module.exports = {getItems, getItem,createItems,deleteItems}