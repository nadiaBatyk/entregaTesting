const ProductosRepository = require("../servicios/productosRepository");

module.exports = class ProductosControllers {
  constructor() {
    this.productosRepository = new ProductosRepository();
  }
  getProducts = async (req, res, next) => {
    try {
      let productos = await this.productosRepository.obtenerProductos();
      return res.json(productos);
    } catch (error) {
      return next(error);
    }
  };

  addNewProduct = async (req, res, next) => {
    try {
      let producto = req.body;
      let newProduct = await this.productosRepository.agregarProducto(producto);
      return res.json(newProduct);
    } catch (error) {
      return next(error);
    }
  };
}
