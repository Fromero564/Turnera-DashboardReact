const express = require("express");
const router = express.Router();
const path = require("path");
const carritoAPIController = require("../../controllers/api/carritoAPIController");

router.post("/carrito/:id", carritoAPIController.agregarCarrito);
router.put("/carrito/:id", carritoAPIController.modificarProducto);
router.delete("/:id", carritoAPIController.eliminarProducto);

module.exports = router;
