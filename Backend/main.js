const { app, BrowserWindow } = require('electron')
const {sequelize} = require('./src/database/models')
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const appExpress = express();
const path = require("path");
const cors = require("cors");
const fs = require("fs");
const sqlite3 = require("sqlite3");
const methodOverride = require("method-override");
const router = require("./routers/mainRouter.js");


appExpress.use(bodyParser.urlencoded({ extended: true }));

appExpress.use(methodOverride("_method"));

//Borrar datos y resetear programa
const parentDirectory = __dirname;
const sourceFilePath = path.join(
  parentDirectory,
  "public",
  "sql",
  "baseproyecto.sql"
);
const destinationFilePath = path.join(
  parentDirectory,
  "public",
  "sql",
  "cervesia_db.sqlite"
);

function resetDatabase(req, res) {
  try {
    const db = new sqlite3.Database(destinationFilePath);

    const sqlContent = fs.readFileSync(sourceFilePath, "utf-8");

    db.exec(sqlContent, function (err) {
      if (err) {
        console.error("Error al resetear la base de datos:", err.message);
        res.status(500).send("Error al resetear la base de datos");
      } else {
        console.log("Base de datos reseteada con éxito.");
        res.redirect("/");
      }

      db.close();
    });
  } catch (error) {
    console.error("Error al resetear programa:", error.message);
    res.status(500).send("Error al resetear el programa");
  }
}

appExpress.post("/reset-database", (req, res) => {
  resetDatabase(req, res);
});

//Para utilizar cors
appExpress.use(cors());

appExpress.use(express.static(path.join(__dirname, "public")));

appExpress.use(
  session({
    secret: "cervesia_theoriginalbeer",
    resave: false,
    saveUninitialized: true,
  })
);

appExpress.set("view engine", "ejs");
appExpress.set("views", path.join(__dirname, "views"));

appExpress.listen(3010, () => {
  console.log("se inicio servidor en puerto 3010");
});

// Middleware para log
appExpress.use((req, res, next) => {
  console.log(`Se accedió a la ruta: ${req.url}`);
  next();
});

appExpress.use("/", router);
let mainWindow;
const createWindow = () => {
   mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.loadURL('http://localhost:3010');

  sequelize.sync(),then(()=>{
    conmsole.log('conecction synced')
  })
}

app.whenReady().then(() => {
    createWindow();
  
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
      }
    });
  }).catch((error) => {
    console.error('Error al iniciar la aplicación:', error);
  });

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})