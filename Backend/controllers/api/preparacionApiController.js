const path = require("path");
const db = require("../../src/database/models");
const sequelize = db.sequelize;
const { Op, where } = require("sequelize");
const moment = require("moment");
const req = require("express/lib/request");

const preparacion = db.Pedido;
const ProductosCarrito = db.Productocarrito;
const Retiro = db.Retiro;

const preparacionApiController = {
  eliminarPedidoPreparacion: async (req, res) => {
    let user_id = req.params.user_id;
    try {
      await preparacion.destroy({
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

module.exports = preparacionApiController;
