
const ProductosRepository = require("../servicios/productosRepository");

const productosRepository = new ProductosRepository()

async function getProductosController() {
  return productosRepository.obtenerProductos()
}
async function addNewProduct(producto){
await productosRepository.agregarProducto(producto)
}
module.exports = { getProductosController,addNewProduct}