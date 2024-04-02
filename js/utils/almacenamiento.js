class Almacenamiento{
    constructor(obj){
        this.datos = [];
        this.dato = obj.dato;
        this.numeros =obj.numeros;
    }

    agregarNumeros(arreglo){
        let html = "";

        for(var i in arreglo){
            html += `<option>${arreglo[i]}</option>`;
        }
        this.numeros.innerHTML = html;
    }

    guardar(ref){
        if(ref.dato.value != "" ){
            datos.push(ref.dato.value);
            ref.dato.value = "";
            localStorage.setItem("datos", JSON.stringify(datos));
            ref.agregarNumeros(datos);
        }
    
    }

  
}