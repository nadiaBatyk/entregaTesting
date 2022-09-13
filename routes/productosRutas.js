const Router = require("express");
const router = Router();

function isAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.render("layouts/login", { layout: "login" });
  }
}
//cuando le pegan al endpoint / render index.hbs
router.get("/", isAuth, (req, res) => {
  
  res.render("layouts/index", {
    layout: "index",
    email: req.user.email,
  });
});
/* 
socketServer.on("connection", async (socket) => {
  try {
    const productos = await getProductosController();
    socket.emit("datosTabla", productos);
  } catch (error) {
    logger.error(error);
  }

  socket.on("nuevo-producto", async (producto) => {
    try {
      await addNewProduct(producto);
      const productos = await getProductosController();
      socketServer.sockets.emit("datosTabla", productos);
    } catch (error) {
      logger.error(error);
    }
  });

  
}); */

module.exports = router;
