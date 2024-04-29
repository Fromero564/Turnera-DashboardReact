const express = require("express");
const router = express.Router();
const apiproducts = require("./api/apiProducts");
const apiuser = require("./api/apiUser");
const apicart = require("./api/apiCart");
const apipedido = require("./api/apiPedidos");
const apiretiro = require("./api/apiRetiro");
const apiComentarioPago = require("./api/apiComentarioMedioPago.js");
const mainController = require("../controllers/mainController.js");

router.get("/", mainController.Home);

router.post("/", mainController.Home);

//Se traen datos de Api productos
router.use("/", apiproducts);

//Se traen datos de Api usuarios
router.use("/", apiuser);

//Se traen datos de Api carrito
router.use("/", apicart);

//Se traen datos de Api pedidos
router.use("/", apipedido);

//Se traen datos de Api retiros
router.use("/", apiretiro);

//Se traen datos de Api comentario/Medios de pago
router.use("/", apiComentarioPago);


module.exports = router;
