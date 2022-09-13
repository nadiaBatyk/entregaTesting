const Router = require("express");
const ProductosControllers = require("../controllers/productosControllers");
const router = Router();

const productController = new ProductosControllers();
//cuando le pegan al endpoint / render index.hbs
router.get("/", productController.getProducts);
router.post("/", productController.addNewProduct);

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
