const path = require("path");
const db = require("../src/database/models");
const sequelize = db.sequelize;
const { Op, where } = require("sequelize");
const moment = require("moment");
const req = require("express/lib/request");
const comentarioMediosDePagoAPIController = require("./api/comentarioMedioDePagoAPIController");

const Producto = db.Producto;
const ProductosCarrito = db.Productocarrito;
const User = db.User;
const Pedido = db.Pedido;
const Retiro = db.Retiro;
const ComentariosMediosDePago = db.ComentariosMediosDePago;

module.exports = {
  Home: async (req, res) => {
    const user = req.session.user;
    const terminoBusqueda = req.body.busqueda;
    const buscados = req.body.buscados;

    try {
      let productosAgregados = [];
      let metodoPagoComentarios = [];
      if (user && user.id) {
        productosAgregados = await ProductosCarrito.findAll({
          where: {
            user_id: user.id,
          },
          include: {
            model: Producto,
            attributes: ["id", "nombre", "precio"],
          },
        });
      }

      const resultados = terminoBusqueda
        ? await Producto.findAll({
            where: {
              nombre: {
                [Op.like]: `%${terminoBusqueda}%`,
              },
            },
          })
        : [];
      //  barra de busqueda
      const buscar = buscados
        ? await Pedido.findAll({
            where: {
              user_id: {
                [Op.like]: `%${buscados}%`,
              },
            },
          })
        : [];

      if (user && user.id) {
        metodoPagoComentarios = await ComentariosMediosDePago.findAll({
          where: {
            user_id: user.id,
          },
        });
      }
      const productos = await Producto.findAll({});

      const pedidos = await Pedido.findAll({});

      const retiros = await Retiro.findAll({});

      console.log("MetodoPagoComentarios:", metodoPagoComentarios);
      res.render("index", {
        productos,
        user,
        productosAgregados,
        pedidos,
        retiros,
        resultados,
        buscar,
        metodoPagoComentarios,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send("Error interno del servidor");
    }
  },
};
