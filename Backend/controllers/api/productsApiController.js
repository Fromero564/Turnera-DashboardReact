const path = require("path");
const db = require("../../src/database/models");
const sequelize = db.sequelize;
const { Op, where } = require("sequelize");
const moment = require("moment");
const req = require("express/lib/request");

const Producto = db.Producto;

const productsAPIController = {
  product: (req, res) => {
    res.render("user/create");
  },

  create: (req, res) => {
    Producto.create({
      nombre: req.body.name,
      precio: req.body.price,
      descripcion: req.body.description,
    })
      .then(() => {
        return res.redirect("/");
      })
      .catch((error) => res.send(error));
  },
  update: async (req, res) => {
    let productoModificar = req.params.id;
    let buscarProductoModificar = await Producto.findOne({
      where: {
        id: productoModificar,
      },
    });
    await buscarProductoModificar.update({
      nombre: req.body.name,
      precio: req.body.price,
      descripcion: req.body.description,
    });

    return res.redirect("/");
  },

  edit: async (req, res) => {
    const product = await Producto.findByPk(req.params.id);
    res.render("user/edit", { product });
  },

};

module.exports = productsAPIController;
