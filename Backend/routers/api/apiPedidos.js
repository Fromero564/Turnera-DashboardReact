const express = require("express");
const router = express.Router();
const path = require("path");
const pedidoAPIController = require("../../controllers/api/pedidoApiController");
const preparacionApiController = require("../../controllers/api/preparacionApiController");

router.get("/apipedidos", pedidoAPIController.pedidoApi);
router.get("/pedidospdf", pedidoAPIController.pedidoPdf);
router.get("/pedidosexcel", pedidoAPIController.pedidoExcel);
router.post("/pedido/", pedidoAPIController.pedidoCargado);
router.delete(
  "/pedido/:user_id",
  preparacionApiController.eliminarPedidoPreparacion
);

module.exports = router;
