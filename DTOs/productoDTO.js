module.exports = class ProductoDTO {
    constructor(datos){
        this.nombre=datos.nombre,
        this.precio=datos.precio,
        this.link=datos.link
    }
}