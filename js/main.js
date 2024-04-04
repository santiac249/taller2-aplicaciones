import Carro from "./utils/carro.js";
import Producto from "./utils/producto.js";


let cantidad;
let productosCarro = [];
const productosTienda = [
    new Producto({
        id: 1,
        nombre: 'Moto',
        precio: '10.000.000',
        imagen: 'https://http2.mlstatic.com/D_NQ_NP_755758-MCO74683163093_022024-O.webp',
        descripcion: 'Moto bonita'
    }),
    new Producto({
        id: 1,
        nombre: 'Segundazo',
        precio: '10.000.000',
        imagen: 'https://carroya-commons.avaldigitallabs.com/2075feab-8552-4aad-aeea-8d2573e6dfcd/2075feab-8552-4aad-aeea-8d2573e6dfcd_1708548307442_l.jpg',
        descripcion: 'Fz usada'
    }),

    
]

function mostrarProductos(){
    let temp = '';
    const sectionProductos = document.querySelector('.productos')

    for(var i in productosTienda) {

        temp += 
        `<div class="producto">
            <div class="img_producto">
                <img src="${productosTienda[i].imagen}">
            </div>
            <div class="info_producto">
                <div>
                    <span >${productosTienda[i].nombre}</span>
                    <br>
                    <span >${productosTienda[i].descripcion}</span>
                    <br>
                    <span >${productosTienda[i].precio}</span>
                </div>
                <div>
                    
                <div class="controles">
                        <span class="control">-</span>
                
                        <input type="text" value="0" class="cantidad">
                        <span class="control">+</span>
                    </div>
                    <button class="btn_agregar">
                        <img class="carro_producto" src="/img/carrito.png" alt="carrito" width="20px" height="20px">
                        <span class="txt_agregar">Agregar</span>
                    </button>
                </div>
            </div>
        </div>`;
    }

    sectionProductos.innerHTML = temp;
    
}

window.onload = () => {
    mostrarProductos()
    /* cantidad = document.getElementById("cantidad");

    productosCarro = localStorage.getItem("productos") ? JSON.parse(localStorage.getItem("productos")) : []
    let local = new Carro({
        cantidad: cantidad,
        productosCarro: productosCarro
    });

    const elementosProducto = document.querySelectorAll('.producto');
    elementosProducto.forEach(elemento => {
        const carrito = elemento.querySelector('.carro_producto');
        const nombre = elemento.querySelector('.nombre_producto').innerText;
        const producto = { nombre: nombre, cantidad: 1 };
        carrito.addEventListener("click", () => local.agregarProducto(producto));
    });

    local.actualizarCantidad() */
}