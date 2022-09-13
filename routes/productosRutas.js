const Router = require("express");
const ProductosControllers = require("../controllers/productosControllers");
const router = Router();

const productController = new ProductosControllers();

router
  .route("/")
  .get(productController.getProducts)
  .post(productController.addNewProduct)
  .put(productController.updateProduct);
router
  .route("/:id")
  .delete(productController.deleteProduct);

module.exports = router;
