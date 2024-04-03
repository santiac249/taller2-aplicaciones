let cantidad;
let productos = [];
window.onload = () => {
    cantidad = document.getElementById("cantidad");

    productos = localStorage.getItem("productos") ? JSON.parse(localStorage.getItem("productos")) : []
    let local = new Carro({
        cantidad: cantidad,
        productos: productos
    });

    const elementosProducto = document.querySelectorAll('.producto');
    elementosProducto.forEach(elemento => {
        const carrito = elemento.querySelector('.carro_producto');
        const nombre = elemento.querySelector('.nombre_producto').innerText;
        const producto = { nombre: nombre, cantidad: 1 };
        carrito.addEventListener("click", () => local.agregarProducto(producto));
    });

    local.actualizarCantidad()
}