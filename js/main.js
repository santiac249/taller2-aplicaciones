import Carro from "./utils/carro.js";
import Producto from "./utils/producto.js";

let local;
let cantidad;
let productosCarro = [];

window.productosTienda = [
    new Producto({
        id: 1,
        nombre: 'Moto',
        precio: '10.000.000',
        imagen: 'https://http2.mlstatic.com/D_NQ_NP_755758-MCO74683163093_022024-O.webp',
        descripcion: 'Moto bonita'
    }),
    new Producto({
        id: 2,
        nombre: 'Segundazo',
        precio: '10.000.000',
        imagen: 'https://carroya-commons.avaldigitallabs.com/2075feab-8552-4aad-aeea-8d2573e6dfcd/2075feab-8552-4aad-aeea-8d2573e6dfcd_1708548307442_l.jpg',
        descripcion: 'Fz usada'
    }),
];

window.agregarProducto = function (id) {
    const producto = productosTienda.find(prod => prod.id === id);
    if (producto) {
        local.agregarProducto(producto);
    }
}

function mostrarProductos() {
    let temp = '';
    const sectionProductos = document.querySelector('.productos')

    for (var i in productosTienda) {
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
                
                    
                    <div class="controles">
                        <span onclick="productosTienda[${i}].restarCantidad()" class="control">-</span>
                        <input type="text" value="0" class="cantidad" id="cantidad-${productosTienda[i].id}">
                        <span onclick="productosTienda[${i}].sumarCantidad()" class="control">+</span>
                    </div>
            
                
            </div>
        </div>`;
    }

    sectionProductos.innerHTML = temp;

}

window.onload = () => {
    mostrarProductos()
    cantidad = document.getElementById("cantidad");

    productosCarro = localStorage.getItem("productos") ? JSON.parse(localStorage.getItem("productos")) : []
    local = new Carro({
        cantidad: cantidad,
        productosCarro: productosCarro
    });

    mostrarProductos()
    local.actualizarCantidad();
    
    productosTienda.forEach(producto => {
        const cantidadProducto = productosCarro.find(prod => prod.id === producto.id).cantidad;
        producto.cantidad = cantidadProducto;

        const inputCantidad = document.getElementById(`cantidad-${producto.id}`);
        if (inputCantidad) {
            inputCantidad.value = cantidadProducto;
        }
    });
}