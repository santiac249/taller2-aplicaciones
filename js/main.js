/*
Audio tomado de:
  https://pixabay.com/music/
Libreria de sonido:
  https://github.com/goldfire/howler.js
*/

// let mp3 = "https://res.cloudinary.com/dpwnji5mr/video/upload/v1668255106/demo/powerful-beat-121791_ninqyk.mp3";
let mp3 = "/mp3/audio1.mp3"; // Ruta a
let control_volumen;
let btn_play, btn_pause, meter, actual, duracion;
let sonidos, volumen;
let audioActualId;
var paused = false;
var saveSeek;
window.onload = function () {
    btn_play = document.getElementById("btn_play");
    btn_pause = document.getElementById("btn_pause");
    meter = document.getElementById("meter");
    actual = document.getElementById("actual");
    duracion = document.getElementById("duracion");
    control_volumen = document.getElementById("volumecontrol");

    sonidos = {

        audio1: new Howl({
            src: ["/mp3/audio1.mp3"],
            volume: .2,
            loop: true,
            stereo: 0,
            onplay: iniciarProgreso,
            onpause: detenerProgreso,
            onend: detenerProgreso
        }),

        audio2: new Howl({
            src: ["/mp3/audio2.mp3"],
            volume: .2,
            loop: true,
            stereo: 0,
            onplay: iniciarProgreso,
            onpause: detenerProgreso,
            onend: detenerProgreso
        }),
    };
    btn_play.addEventListener("click", pausar);
    btn_pause.addEventListener("click", pausar);
    control_volumen.addEventListener("change", actualizarVolumen);
    volumen = localStorage.getItem("volumen");
    if (volumen) {
        Object.keys(sonidos).forEach(function (key) {
            sonidos[key].volume(volumen);
        });
        control_volumen.value = volumen;
    }

}


function reproducir(audioId) {
  
        Object.keys(sonidos).forEach(function (key) {
            sonidos[key].pause();
        });
        // Reproduce el audio seleccionado
        sonidos[audioId].play();
        btn_play.classList.add("ocultar");
        btn_pause.classList.remove("ocultar");

        audioActualId = audioId;
        paused= false;

}

function pausar() {

    if (paused) {
        sonidos[audioActualId].play();
      
        btn_play.classList.add("ocultar");
        btn_pause.classList.remove("ocultar");
        paused = false;
    } else {
   
        sonidos[audioActualId].pause();
        btn_play.classList.remove("ocultar");
        btn_pause.classList.add("ocultar");
        paused = true;
        
    }
};

function iniciarProgreso() {
    intervaloProgreso = setInterval(actualizarProgreso, 1000);
}

function detenerProgreso() {
    clearInterval(intervaloProgreso);
}

function actualizarProgreso() {
    console.log('Actualizando progreso');
    let currentTime = 0;
    let duration = 0;
    let currentMinutes = 0;
    let currentSeconds = 0;
    let durationMinutes = 0;
    let durationSeconds = 0;

    // Determina cuál es el audio activo y actualiza el progreso en consecuencia
    Object.keys(sonidos).forEach(function (key) {
        if (sonidos[key].playing()) {
            currentTime = sonidos[key].seek();
            duration = sonidos[key].duration();
        }
    });

    // Calcula los minutos y segundos
    currentMinutes = Math.floor(currentTime / 60);
    currentSeconds = Math.floor(currentTime % 60);
    durationMinutes = Math.floor(duration / 60);
    durationSeconds = Math.floor(duration % 60);

    // Actualiza el texto y el valor de la barra de progreso
    actual.textContent = currentMinutes.toString().padStart(2, '0') + ":" + currentSeconds.toString().padStart(2, '0');
    duracion.textContent = durationMinutes.toString().padStart(2, '0') + ":" + durationSeconds.toString().padStart(2, '0');
    meter.value = currentTime / duration;
}


function actualizarVolumen(evento) {
    volumen = evento.target.value;
    Object.keys(sonidos).forEach(function (key) {
        sonidos[key].volume(volumen);
    });
    localStorage.setItem("volumen", volumen);
}