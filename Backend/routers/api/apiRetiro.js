const express = require("express");
const router = express.Router();
const retirosApiController = require("../../controllers/api/retiroAPIController");

router.get("/apiretiros",retirosApiController.retiroApi);
router.post("/retiro", retirosApiController.retiro);
router.delete("/retiro/:user_id", retirosApiController.eliminarPedido);

module.exports = router;
