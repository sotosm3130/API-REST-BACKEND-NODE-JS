const express = require("express");
const router =  express.Router();
const customHeader = require("../middleware/customHeader");
const {validatorCreateItem, validatorGetItem} = require("../validators/tracks");
const {getItems, getItem, createItems, updateItems, deleteItems} = require("../controllers/tracks");
const authMiddleware = require("../middleware/session");
const checkRol = require("../middleware/rol");

//TODO http://localhots/tracks GET, POST, DELETE, PUT
/** 
 * Listar los items
 */
router.get("/", authMiddleware, getItems); 
/** 
 * Obtener un detalle de item
 */
 router.get("/:id", authMiddleware, validatorGetItem,getItem); 
/**
 * Crea un registro
 */
router.post("/", authMiddleware, checkRol(["admin"]), validatorCreateItem, createItems); 
/**
 * actualizar un registro
 */
 router.put("/:id", authMiddleware,validatorGetItem, validatorCreateItem, updateItems); 
/**
 * eliminar un registro
 */
 router.delete("/:id", authMiddleware, validatorGetItem, deleteItems); 


module.exports = router;