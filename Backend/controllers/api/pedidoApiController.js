const path = require("path");
const db = require("../../src/database/models");
const sequelize = db.sequelize;
const { Op, where } = require("sequelize");
const moment = require("moment");
const req = require("express/lib/request");
const PDFDocument = require('pdfkit');
const fs = require('fs');
const xl = require('excel4node');

let date = new Date();
let fechaDia = date.getUTCDate();
let fechaMes = date.getUTCMonth() + 1;
let fechaAnio = date.getUTCFullYear();

const Producto = db.Producto;
const ProductosCarrito = db.Productocarrito;
const User = db.User;
const Pedido = db.Pedido;
const Pedidosderespaldo = db.Pedidosderespaldo;
const ComentariosMediosDePago = db.ComentariosMediosDePago;

const pedidoAPIController = {
  pedidoApi: async (req, res) => {
    let PedidosTotal = await Pedido.findAll({});
    res.json(PedidosTotal);
  },
  pedidoPdf: async (req, res) => {
    try {
      const pedidos = await Pedidosderespaldo.findAll({});
  
      const doc = new PDFDocument();
  
      res.setHeader('Content-Disposition', 'attachment; filename=pedidos.pdf');
      res.setHeader('Content-Type', 'application/pdf');
  

      doc.pipe(res);
  
      doc.fontSize(12).text('Datos de pedidos realizados', { align: 'center', underline: true });
  
      pedidos.forEach((pedido) => {
        doc.fontSize(10).text(`ID: ${pedido.user_id}, Pedido: ${pedido.pedido}, Comentario/Forma de Pago: ${pedido.comentario_pago}, Total Pago: $ ${pedido.total_pago}`);
      });
  
      doc.end();
  
      console.log('PDF generado con éxito: pedidos.pdf');
    } catch (error) {
      console.error('Error al realizar la consulta:', error);
      res.status(500).send('Error al generar el PDF');
    }
  },
  pedidoExcel:async(req,res)=>{
    const pedidosDeExcel = await Pedidosderespaldo.findAll({});
  
    var wb = new xl.Workbook();
    let nombreArchivo = "pedidosExcel"+fechaDia + "_" + fechaMes + "_"+fechaAnio;

    var ws = wb.addWorksheet(nombreArchivo);

    // Create style
        var cualColumnaEstilo = wb.createStyle({
        font: {
        name: 'Arial',
        color: '#000000',
        size: 12,
        bold:true,
        }
     });
        var contenidoEstilo = wb.createStyle({
          font: {
          name: 'Arial',
          color: '#000000',
          size: 11,
          }
       });

      //Column Names
      ws.cell(1, 1).string("Usuario").style(cualColumnaEstilo);
      ws.cell(1, 2).string("Pedido").style(cualColumnaEstilo);
      ws.cell(1, 3).string("Comentario/Pago").style(cualColumnaEstilo);
      ws.cell(1, 4).string("Total").style(cualColumnaEstilo);
   
      let cualFila = 2;
 

      //Foreach -
       pedidosDeExcel.forEach(pedidoDeExcel=>{
        ws.cell(cualFila, 1).number(pedidoDeExcel.user_id).style(contenidoEstilo);
        ws.cell(cualFila, 2).string(pedidoDeExcel.pedido).style(contenidoEstilo);
        ws.cell(cualFila, 3).string(pedidoDeExcel.comentario_pago).style(contenidoEstilo);
      ws.cell(cualFila, 4).number(pedidoDeExcel.total_pago).style(contenidoEstilo);
        cualFila = cualFila + 1;
       });

      //File Route

      const pathExcel = path.join(__dirname,"../","../",'public',nombreArchivo +'.xlsx');
      
      //Save File
      wb.write(pathExcel, function(err,stats){
        if(err) console.log(err);
        else{
          //download file
          function downloadFile(){
            res.download(pathExcel);
          }
          downloadFile();
          //Remove File from program folder
          fs.rm(pathExcel,function(err){
            if(err) console.log(err);
            else console.log("Archivo descargado y eliminado del server");
          });
        
        }
      });
  },
  pedidoCargado: async (req, res) => {
    let user_id = req.body.user_id;
    let nombresProductos = [];
    let comentariosPedidos = [];

    let user_carga = await ProductosCarrito.findAll({
      where: {
        user_id: user_id,
      },
      include: {
        model: Producto,
        attributes: ["id", "nombre", "precio"],
      },
    });
    for (let item of user_carga) {
      nombresProductos.push(item.cantidad);
      nombresProductos.push(item.Producto.nombre);
    }
    let nombresProductosString = nombresProductos.join("  ");

    let total = 0;

    for (let item of user_carga) {
      let cantidad = item.cantidad;
      let precio = item.Producto.precio;
      let subtotal = cantidad * precio;
      total += subtotal;
    }

    let comentarioMediodePago = await ComentariosMediosDePago.findAll({
      where: {
        user_id: user_id,
      },
    });
    for (let item of comentarioMediodePago) {
      comentariosPedidos.push(item.comentario);
      comentariosPedidos.push(item.medio_de_pago);
    }

    let comentariosPedidosString = comentariosPedidos.join(" / ");

    await Pedido.create({
      user_id: user_id,
      pedido: nombresProductosString,
      comentario_pago: comentariosPedidosString,
      total_pago: total,
    });
    await Pedidosderespaldo.create({
      user_id: user_id,
      pedido: nombresProductosString,
      comentario_pago: comentariosPedidosString,
      total_pago: total,
    });

    res.redirect("/");
  },
};

module.exports = pedidoAPIController;
