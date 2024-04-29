const path = require("path");
const db = require("../../src/database/models");
const { Op, where } = require("sequelize");
const moment = require("moment");
const req = require("express/lib/request");

const Producto = db.Producto;
const ProductosCarrito = db.Productocarrito;
const User = db.User;
const ComentariosMediosDePago = db.ComentariosMediosDePago;

const carritoAPIController = {
  agregarCarrito: async (req, res) => {
    let usuarioSession = req.session.user;
    let product_id = req.params.id;
    let cantidad = req.body.cantidad;
    let medioPago = req.body.medioPago;
    let user_id = usuarioSession.id;

    let productoYaAgregado = await ProductosCarrito.findOne({
      where: {
        user_id: user_id,
        productos_id: product_id,
      },
    });

    if (!productoYaAgregado) {
      await ProductosCarrito.create({
        cantidad: cantidad,
        productos_id: product_id,
        user_id: user_id,
        pago: medioPago,
      });

      if (
        req.body.userid_comentario &&
        req.body.comentario &&
        req.body.selectMedioPago
      ) {
        await ComentariosMediosDePago.create({
          user_id: req.body.userid_comentario,
          comentario: req.body.comentario,
          medio_de_pago: req.body.selectMedioPago,
        });
      } else {
        console.error(
          "Datos incompletos para crear el comentario de medio de pago"
        );
      }
      res.redirect("/");
    } else {
      await ProductosCarrito.update(
        {
          cantidad: Number(productoYaAgregado.cantidad) + Number(cantidad),
        },
        {
          where: {
            user_id: user_id,
            productos_id: product_id,
          },
        }
      );

      if (
        req.body.userid_comentario &&
        req.body.comentario &&
        req.body.selectMedioPago
      ) {
        await ComentariosMediosDePago.update(
          {
            user_id: req.body.userid_comentario,
            comentario: req.body.comentario,
            medio_de_pago: req.body.selectMedioPago,
          },
          {
            where: {
              user_id: user_id,
              productos_id: product_id,
            },
          }
        );
      }

      res.redirect("/");
    }
  },

  eliminarProducto: async (req, res) => {
    let usuarioSession = req.session.user;

    let user_id = await ProductosCarrito.findOne({
      where: {
        user_id: usuarioSession.id,
      },
    });
    ProductosCarrito.destroy({
      where: {
        productos_id: req.params.id,
        user_id: usuarioSession.id,
      },
    });

    res.redirect("/");
  },

  modificarProducto: async (req, res) => {
    let usuarioSession = req.session.user;
    let productoModificar = req.params.id;
    let cantidadModificada = req.body.cantidad;

    let productoEnCarrito = await ProductosCarrito.findOne({
      where: {
        user_id: usuarioSession.id,
        id: productoModificar,
      },
    });
    await productoEnCarrito.update({
      cantidad: cantidadModificada,
    });

    return res.redirect("/");
  },
};

module.exports = carritoAPIController;
