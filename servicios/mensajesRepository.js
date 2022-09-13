const MensajeDTO = require("../DTOs/mensajeDTO");
const mensajeSchema = require("../models/mensajeSchema");
const MensajesDAO = require("../persistencia/mensajesDAO");

module.exports = class MensajesRepository {
  constructor() {
    this.mensajesDAO = MensajesDAO.getInstance("mensajes", mensajeSchema);
  }
  async obtenerMensajes() {
    const mensajes = await this.mensajesDAO.getAll();

    return mensajes.map((m) => new MensajeDTO(m));
  }
  async agregarMensaje(mensaje) {
    const mens = await this.mensajesDAO.save(mensaje);
    return new MensajeDTO(mens);
  }
};
