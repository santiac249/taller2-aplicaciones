let datos = [];
let dato, numeros;

window.onload = () =>{
    dato = document.getElementById("dato");
    numeros = document.getElementById("numeros")
    let btn = document.getElementById("btn_enviar");

    datos = localStorage.getItem("datos")  ? JSON.parse(localStorage.getItem("datos")) : []
    let local = new Almacenamiento({
        dato:dato,
        numeros:numeros
    });
    
    btn.addEventListener("click",local.guardar.bind(null,local));
    local.agregarNumeros(datos);


}