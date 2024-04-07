/*
Audio tomado de:
  https://pixabay.com/music/
Libreria de sonido:
  https://github.com/goldfire/howler.js
*/

let mp3 = "https://res.cloudinary.com/dpwnji5mr/video/upload/v1668255106/demo/powerful-beat-121791_ninqyk.mp3";
let control_volumen, control_stereo;
let btn_play, btn_pause;
let sonido, volumen;

window.onload = function(){
//   control_volumen = document.getElementById("control_volumen");
//   control_stereo = document.getElementById("control_stereo");
  btn_play = document.getElementById("btn_play");
  btn_pause = document.getElementById("btn_pause");
  
  sonido = new Howl({
    src: [mp3],
    volume:.2,
    loop: true,
    stereo:0
  });

 btn_play.addEventListener("click",reproducir);
 btn_pause.addEventListener("click",pausar);
//  control_volumen.addEventListener("change",actualizarVolumen);
//  control_stereo.addEventListener("change",actualizarStereo);
//  volumen = localStorage.getItem("volumen");
//  if(volumen){
//    sonido.volume(volumen);
//    control_volumen.value = volumen;
//  }
  
}

// function actualizarVolumen(evento){
//   volumen = evento.target.value;
//   sonido.volume(volumen);
//   localStorage.setItem("volumen",volumen);
// }

// function actualizarStereo(evento){
//   let valor = parseFloat(evento.target.value).toFixed(2);
//   sonido.stereo(valor);
// }

function reproducir(){
  sonido.play();
  btn_play.classList.add("ocultar");
  btn_pause.classList.remove("ocultar");
}

function pausar(){
  sonido.pause();
  btn_play.classList.remove("ocultar");
  btn_pause.classList.add("ocultar");
}