const BasicDAO = require("./DAO");

let instancia = null;
module.exports = class MensajesDAO extends BasicDAO {
    constructor(collectionName, schema){
        super(collectionName,schema)
    }
    static getInstance(collectionName, schema){
        if(!instancia) instancia = new MensajesDAO(collectionName, schema)
        return instancia
      }
}