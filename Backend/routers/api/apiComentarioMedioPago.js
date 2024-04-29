const express = require("express");
const router = express.Router();
const path = require("path");
const comentarioMedioDePagoAPIController = require("../../controllers/api/comentarioMedioDePagoAPIController");

router.post("/comentario", comentarioMedioDePagoAPIController.crearCampo);

module.exports = router;