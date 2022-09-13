const MensajesRepository = require("../servicios/mensajesRepository");


const mensajesRepository = new MensajesRepository();
async function getMensajesController() {
  return mensajesRepository.obtenerMensajes();
}
async function sendNewMessage(mensaje) {
  await mensajesRepository.agregarMensaje(mensaje);
}
module.exports = { getMensajesController, sendNewMessage };
