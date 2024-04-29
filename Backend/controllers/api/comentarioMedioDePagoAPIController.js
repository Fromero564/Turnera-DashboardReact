const path = require("path");
const db = require("../../src/database/models");
const sequelize = db.sequelize;
const { Op, where } = require("sequelize");
const moment = require("moment");
const req = require("express/lib/request");


const ComentariosMediosDePago = db.ComentariosMediosDePago;

const comentarioMediosDePagoAPIController={

    crearCampo: async(req,res)=>{
       await ComentariosMediosDePago.create({
        user_id: req.body.userid_comentario,
        comentario: req.body.comentario,
        medio_de_pago: req.body.selectMedioPago,
      });
 
      res.redirect("/");
      
    }

}

module.exports = comentarioMediosDePagoAPIController;