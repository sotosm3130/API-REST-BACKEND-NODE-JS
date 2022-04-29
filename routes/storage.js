const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../utils/handleStorage")
const {validatorGetItem} = require("../validators/storage");
const {createItems, getItem, getItems, deleteItems} = require("../controllers/storage")
//TODO http://localhost:3000//api/storage


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
router.post("/",uploadMiddleware.single("myfile"), createItems)
/**
 * eliminar un registro
 */
router.delete("/:id", validatorGetItem, deleteItems); 


module.exports =router;