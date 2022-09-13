const express = require("express");
require("dotenv").config({ path: "./config/DBconfig/.env" });
const rutasProducto = require("./routes/productosRutas");
const session = require("express-session");
const compression = require("compression");
const logger = require("./config/winstonConfig");
const logWinston = require("./utils/logger");

const app = express();

//middlewares
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//middleware para cargar archivos
app.use(express.static(__dirname + "/public"));

//RUTAS
app.use("/productos", logWinston, rutasProducto);
app.get("*.ico", function () {});
app.use("*", (req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});
app.use((err, req, res, next) => {
  if (err) {
    logger.warn(`ruta inexistente`);
    res.send(`ruta inexistente`);
  }
});
//PUERTO

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
  logger.info(`conectado al puerto ${PORT}`);
});
server.on("error", (error) => logger.error(`error en el servidor ${error}`));
