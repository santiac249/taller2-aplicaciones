class Reproductor {
    constructor() {
        this.mp3 = "/mp3/audio1.mp3";
        this.control_volumen;
        this.btn_play;
        this.btn_pause;
        this.meter;
        this.actual;
        this.duracion;
        this.sonidos = {};
        this.volumen;
        this.audioActualId;
        this.paused = false;
        this.saveSeek;
        this.pos_actual = 0;
        this.audiosLista = ['audio1', 'audio2', 'audio3'];
        this.intervaloProgreso;
    }

    inicializarElementos() {
        this.btn_play = document.getElementById("btn_play");
        this.btn_pause = document.getElementById("btn_pause");
        this.meter = document.getElementById("meter");
        this.actual = document.getElementById("actual");
        this.duracion = document.getElementById("duracion");
        this.control_volumen = document.getElementById("volumecontrol");
    }

    crearSonidos() {
        this.sonidos = {
            audio1: new Howl({
                src: ["/ogg/audio1.ogg"],
                volume: 0.2,
                loop: true,
                stereo: 0,
                onplay: this.iniciarProgreso.bind(this),
                onpause: this.detenerProgreso.bind(this),
                onend: this.detenerProgreso.bind(this)
            }),
            audio2: new Howl({
                src: ["/ogg/audio2.ogg"],
                volume: 0.2,
                loop: true,
                stereo: 0,
                onplay: this.iniciarProgreso.bind(this),
                onpause: this.detenerProgreso.bind(this),
                onend: this.detenerProgreso.bind(this)
            }),
            audio3: new Howl({
                src: ["/ogg/audio3.ogg"],
                volume: 0.2,
                loop: true,
                stereo: 0,
                onplay: this.iniciarProgreso.bind(this),
                onpause: this.detenerProgreso.bind(this),
                onend: this.detenerProgreso.bind(this)
            }),
        };
    }

    
    iniciarEventos() {
        this.btn_play.addEventListener("click", this.pausar.bind(this));
        this.btn_pause.addEventListener("click", this.pausar.bind(this));
        this.control_volumen.addEventListener("change", this.actualizarVolumen.bind(this));
    
        // Asignar eventos click a las canciones
        const canciones = document.querySelectorAll('.song');
        canciones.forEach(cancion => {
            cancion.addEventListener('click', () => {
                const audioId = cancion.dataset.id;
                this.reproducir(audioId);
            });
        });
    
        // Asignar evento click al botón "siguiente"
        const btnSiguiente = document.getElementById('btn_siguiente');
        btnSiguiente.addEventListener('click', this.siguienteCancion.bind(this));

        // Asignar evento click al botón "siguiente"
        const btnAnterior = document.getElementById('btn_anterior');
        btnAnterior.addEventListener('click', this.anteriorCancion.bind(this));
    
        this.volumen = localStorage.getItem("volumen");
        if (this.volumen) {
            Object.keys(this.sonidos).forEach(key => {
                this.sonidos[key].volume(this.volumen);
            });
            this.control_volumen.value = this.volumen;
        }
    }

    reproducir(audioId) {
        Object.keys(this.sonidos).forEach(key => {
            this.sonidos[key].pause();
        });
        this.sonidos[audioId].seek(0);
        this.sonidos[audioId].play();
        this.btn_play.classList.add("ocultar");
        this.btn_pause.classList.remove("ocultar");

        this.pos_actual = this.audiosLista.findIndex(x => x === audioId);
        this.audioActualId = audioId;
        this.paused = false;

        document.querySelector(`[data-id='${audioId}']`).classList.add("activo");
    }

    pausar() {
        if (this.paused) {
            this.sonidos[this.audioActualId].play();
            document.querySelector(`[data-id='${this.audioActualId}']`).classList.add("activo");
            this.btn_play.classList.add("ocultar");
            this.btn_pause.classList.remove("ocultar");
            this.paused = false;
        } else {
            this.sonidos[this.audioActualId].pause();
            this.btn_play.classList.remove("ocultar");
            this.btn_pause.classList.add("ocultar");
            this.paused = true;

            document.querySelector(`[data-id='${this.audioActualId}']`).classList.remove("activo");
        }
    }

    iniciarProgreso() {
        this.intervaloProgreso = setInterval(this.actualizarProgreso.bind(this), 1000);
    }

    detenerProgreso() {
        clearInterval(this.intervaloProgreso);
    }

    actualizarProgreso() {
        console.log('Actualizando progreso');
        let currentTime = 0;
        let duration = 0;
        let currentMinutes = 0;
        let currentSeconds = 0;
        let durationMinutes = 0;
        let durationSeconds = 0;

        // Determina cuál es el audio activo y actualiza el progreso en consecuencia
        Object.keys(this.sonidos).forEach(key => {
            if (this.sonidos[key].playing()) {
                currentTime = this.sonidos[key].seek();
                duration = this.sonidos[key].duration();
            }
        });

        // Calcula los minutos y segundos
        currentMinutes = Math.floor(currentTime / 60);
        currentSeconds = Math.floor(currentTime % 60);
        durationMinutes = Math.floor(duration / 60);
        durationSeconds = Math.floor(duration % 60);

        // Actualiza el texto y el valor de la barra de progreso
        this.actual.textContent = currentMinutes.toString().padStart(2, '0') + ":" + currentSeconds.toString().padStart(2, '0');
        this.duracion.textContent = durationMinutes.toString().padStart(2, '0') + ":" + durationSeconds.toString().padStart(2, '0');
        this.meter.value = currentTime / duration;
    }

    actualizarVolumen(evento) {
        this.volumen = evento.target.value;
        Object.keys(this.sonidos).forEach(key => {
            this.sonidos[key].volume(this.volumen);
        });
        localStorage.setItem("volumen", this.volumen);
    }

    siguienteCancion() {
        this.detenerProgreso();
        let idReproducir = '';
        if (this.pos_actual + 1 < this.audiosLista.length) {
            this.pos_actual++;
            document.querySelector(`[data-id='${this.audioActualId}']`).classList.remove("activo");
            idReproducir = this.audiosLista[this.pos_actual];
            document.querySelector(`[data-id='${idReproducir}']`).classList.add("activo");
        } else {
            this.pos_actual = 0;
            document.querySelector(`[data-id='${this.audioActualId}']`).classList.remove("activo");
            idReproducir = this.audiosLista[this.pos_actual];
            document.querySelector(`[data-id='${idReproducir}']`).classList.add("activo");
        }

        this.reproducir(idReproducir);
    }

    anteriorCancion() {
        this.detenerProgreso();
        let idReproducir = '';
        if (this.pos_actual - 1 < 0) {
            this.pos_actual = this.audiosLista.length - 1;
            document.querySelector(`[data-id='${this.audioActualId}']`).classList.remove("activo");
            idReproducir = this.audiosLista[this.pos_actual];
            document.querySelector(`[data-id='${idReproducir}']`).classList.add("activo");
        } else {
            this.pos_actual--;
            document.querySelector("[data-id='" + this.audioActualId + "']").classList.remove("activo");
            idReproducir = this.audiosLista[this.pos_actual]
            document.querySelector(`[data-id='${idReproducir}']`).classList.add("activo");
        }


        this.reproducir(idReproducir);
    }
    
}
export default Reproductor;