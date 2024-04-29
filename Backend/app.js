const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const app = express();
const path = require("path");
const cors = require("cors");
const fs = require("fs");
const sqlite3 = require("sqlite3");
const methodOverride = require("method-override");
const router = require("./routers/mainRouter.js");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride("_method"));

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

app.post("/reset-database", (req, res) => {
  resetDatabase(req, res);
});

//Para utilizar cors
app.use(cors());

app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "cervesia_theoriginalbeer",
    resave: false,
    saveUninitialized: true,
  })
);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.listen(3010, () => {
  console.log("se inicio servidor en puerto 3010");
});

// Middleware para log
app.use((req, res, next) => {
  console.log(`Se accedió a la ruta: ${req.url}`);
  next();
});

app.use("/", router);
