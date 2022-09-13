const AuthorDTO = require("./authorDTO");

module.exports = class MensajeDTO {
  constructor(datos) {
    this.author = new AuthorDTO(datos.author);
    (this.timestamp = datos.timestamp), (this.text = datos.text);
  }
};
