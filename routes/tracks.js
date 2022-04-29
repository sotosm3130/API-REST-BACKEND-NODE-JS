const express = require("express");
const router =  express.Router();
const customHeader = require("../middleware/customHeader");
const {validatorCreateItem, validatorGetItem} = require("../validators/tracks");
const {getItems, getItem, createItems, updateItems, deleteItems} = require("../controllers/tracks");

//TODO http://localhots/tracks GET, POST, DELETE, PUT
/** 
 * Listar los items
 */
router.get("/",getItems); 
/** 
 * Obtener un detalle de item
 */
 router.get("/:id", validatorGetItem,getItem); 
/**
 * Crea un registro
 */
router.post("/", validatorCreateItem, createItems); 
/**
 * actualizar un registro
 */
 router.put("/:id",validatorGetItem, validatorCreateItem, updateItems); 
/**
 * eliminar un registro
 */
 router.delete("/:id", validatorGetItem, deleteItems); 


module.exports = router;