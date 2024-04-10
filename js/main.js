import Reproductor from './reproductor.js';

window.onload = function() {
  const reproductor = new Reproductor();
  reproductor.inicializarElementos();
  reproductor.crearSonidos();
  reproductor.iniciarEventos();
};