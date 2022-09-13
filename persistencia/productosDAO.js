const BasicDAO = require("./DAO");

let instancia = null;
module.exports = class ProductosDAO extends BasicDAO {
    constructor(collectionName, schema){
        super(collectionName,schema)
    }
    static getInstance(collectionName, schema){
        if(!instancia) instancia = new ProductosDAO(collectionName, schema)
        return instancia
      }
}