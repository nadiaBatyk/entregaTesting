const productoSchema = require("../models/productoSchema");
const ProductoDTO = require("../DTOs/productoDTO.JS");
const ProductosDAO = require("../persistencia/productosDAO");

module.exports = class ProductosRepository {
  constructor() {
    this.productosDAO = ProductosDAO.getInstance("productos", productoSchema);
  }
  async obtenerProductos() {
    const prod = await this.productosDAO.getAll();
    return prod.map((p) => new ProductoDTO(p));
  }
  async agregarProducto(producto) {
    const prod = await this.productosDAO.save(producto);
    return new ProductoDTO(prod);
  }
  async modificarProducto(producto) {
    const prod = await this.productosDAO.update(producto);
    return new ProductoDTO(prod);
  }
  async eliminarProducto(idProd) {
    const mensaje = await this.productosDAO.deleteById(idProd);
    return mensaje;
  }
};
