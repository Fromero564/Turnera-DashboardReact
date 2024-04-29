const express = require('express');
const router = express.Router();
const userApiController = require('../../controllers/api/userApiController');


router.post("/usuario",userApiController.usuarioCreado);





module.exports=router;