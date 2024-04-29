const express = require("express");
const router = express.Router();
const productosApiController = require("../../controllers/api/productsApiController");

router.get("/productos", productosApiController.product);
router.put("/productos/:id", productosApiController.update);
router.get("/productos/:id/edit", productosApiController.edit);
router.post("/productos", productosApiController.create);


module.exports = router;
