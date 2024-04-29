const path = require("path");
const db = require("../../src/database/models");
const sequelize = db.sequelize;
const { Op, where } = require("sequelize");
const moment = require("moment");
const req = require("express/lib/request");
const { route } = require("../../routers/mainRouter");

const Retiro = db.Retiro;
const Pedido = db.Pedido;

const retiroAPIController = {
  retiroApi:async(req,res)=> {
    let Retirospendientes = await Retiro.findAll({});
    res.json(Retirospendientes);
  },
  retiro: async (req, res) => {
    let usuario = req.body.userid;

    await Retiro.create({
      user_id: usuario,
    });

    Pedido.destroy({
      where: {
        user_id: usuario,
      },
    });
    res.redirect("/");
  },
  eliminarPedido: async (req, res) => {
    let user_id = req.params.user_id;
    try {
      await Retiro.destroy({
        where: {
          user_id: user_id,
        },
      });

      res.redirect("/");
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      res.status(500).send("Error al eliminar el producto");
    }
  },
};
module.exports = retiroAPIController;
