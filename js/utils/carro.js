class Carro {

    constructor(obj) {
        this.productos = obj.productos;
        this.cantidad = obj.cantidad
    }

    agregarProducto(producto) {
        const indiceProductoExistente = this.productos.findIndex(p => p.nombre === producto.nombre);
        if (indiceProductoExistente !== -1) {

            this.productos.splice(indiceProductoExistente, 1);
        } else {
            this.productos.push(producto);
        }
        this.actualizarCantidad()
        localStorage.setItem("productos", JSON.stringify(this.productos));
    }

    actualizarCantidad() {
        this.cantidad.innerText = this.productos.length;
    }


}