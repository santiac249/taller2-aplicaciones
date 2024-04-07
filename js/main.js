import Carro from "./utils/carro.js";
import Producto from "./utils/producto.js";

let local;
let cantidad;
let productosCarro = [];
const seccionProductos = document.getElementById('productos');
const seccionAgregados = document.getElementById('productos-agregados');
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
    new Producto({
        id: 3,
        nombre: 'Leche',
        precio: '5.000',
        imagen: 'https://exitocol.vtexassets.com/arquivos/ids/20786468/Leche-Entera-UHT-Paquete-EXITO-MARCA-PROPIA-5400-ml-3326794_a.jpg?v=638398209713500000',
        descripcion: 'Entera'
    }),
    new Producto({
        id: 4,
        nombre: 'Lecherita',
        precio: '14.000',
        imagen: 'https://exitocol.vtexassets.com/arquivos/ids/21768176/Lache-Condensada-Doy-Pack-LA-LECHERA-600-gr-3045632_a.jpg?v=638449027109700000',
        descripcion: 'Dulce'
    }),
    new Producto({
        id: 5,
        nombre: 'Computador',
        precio: '2.100.000',
        imagen: 'https://exitocol.vtexassets.com/arquivos/ids/22022121/Computador-ASUS-Vivobook-15-Intel-Core-i5-10-Nucleos-8-GB-RAM-1-TB-SSD-3439420_a.jpg?v=638458712377300000',
        descripcion: 'En perfecto estado'
    }),
    new Producto({
        id: 6,
        nombre: 'Huevos',
        precio: '9.160',
        imagen: 'https://exitocol.vtexassets.com/arquivos/ids/20967078/HUEVO-CRIOLLO-A-12UND-PASTOREO-131091_a.jpg?v=638405888423900000',
        descripcion: 'Docena de huevos'
    }),
    new Producto({
        id: 7,
        nombre: 'Estufa',
        precio: '620.000',
        imagen: 'https://exitocol.vtexassets.com/arquivos/ids/15772123/Estufa-Romero-50-T-Gn-Ne-HACEB-9002397-3030462_b.jpg?v=638053900717300000',
        descripcion: 'En perfecto estado'
    }),
    new Producto({
        id: 8,
        nombre: 'Nevera',
        precio: '1.620.000',
        imagen: 'https://exitocol.vtexassets.com/arquivos/ids/19337722/NEVERA-HACEB-Congelador-Superior-243-LTS-9002741-3420414_b.jpg?v=638258999848030000',
        descripcion: 'Buen frío'
    }),

];

window.agregarProducto = function (id) {

    const producto = productosTienda.find(prod => prod.id === id);
    local.agregarProducto(producto);

}

window.eliminarProducto = function (id) {
    local.eliminarProducto(id);
}

window.mostrarVistaCarro = function () {

    if (seccionProductos && seccionAgregados) {
        seccionAgregados.classList.remove('ocultar');
        seccionProductos.classList.add('ocultar');
        mostrarProductosCarro()
    } else {
        console.error('Una o ambas secciones especificadas no existen.');
    }
}

window.mostrarVistaProductos = function () {

    if (seccionProductos && seccionAgregados) {
        seccionAgregados.classList.add('ocultar');
        seccionProductos.classList.remove('ocultar');
        mostrarProductosCarro()
    } else {
        console.error('Una o ambas secciones especificadas no existen.');
    }
}

window.mostrarProductosCarro = function () {
    let temp = '';
    if (productosCarro.length > 0) {
        for (var i in productosCarro) {
            temp +=
                `<div class="producto">
            <div class="img_producto">
                <img src="${productosCarro[i].imagen}">
            </div>
            <div class="info_producto">
                <div>
                    <span >${productosCarro[i].nombre}</span>
                    <br>
                    <span >${productosCarro[i].descripcion}</span>
                    <br>
                    <span >${productosCarro[i].precio}</span>
                </div>
                
                    
                    <div class="controles">
                        <span onclick="eliminarProducto(${productosCarro[i].id})"  class="control">-</span>
                        <input type="text" value="${productosCarro[i].cantidad}" class="cantidad" id="cantidad-carrito-${productosCarro[i].id}">
                        <span onclick="agregarProducto(${productosCarro[i].id})" class="control">+</span>
                    </div>
            
                
            </div>
        </div>`;
        }
    } else {
        temp = '<h1>No hay nada en el carrito</h1>'
    }
    seccionAgregados.innerHTML = temp;
}

function mostrarProductos() {
    let temp = '';

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
                        <span onclick="eliminarProducto(${productosTienda[i].id})" class="control">-</span>
                        <input type="text" value="0" class="cantidad" id="cantidad-${productosTienda[i].id}">
                        <span onclick="agregarProducto(${productosTienda[i].id})" class="control">+</span>
                    </div>
            
                
            </div>
        </div>`;
    }
    seccionProductos.innerHTML = temp;
}

window.onload = () => {
    cantidad = document.getElementById("cantidad");

    productosCarro = localStorage.getItem("productos") ? JSON.parse(localStorage.getItem("productos")) : []
    local = new Carro({
        cantidad: cantidad,
        productosCarro: productosCarro
    });

    mostrarProductos()
    local.actualizarCantidad();

    productosTienda.forEach(producto => {
        const cantidadProducto = productosCarro.find(prod => prod.id === producto.id)?.cantidad;
        if (cantidadProducto) {
            producto.cantidad = cantidadProducto;

            const inputCantidad = document.getElementById(`cantidad-${producto.id}`);
            if (inputCantidad) {
                inputCantidad.value = cantidadProducto;
            }
        }

    });
}