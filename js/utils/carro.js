class Carro {

    constructor(obj) {
        this.productosCarro = obj.productosCarro;
        this.cantidad = obj.cantidad
    }

    agregarProducto(producto) {
        const indiceProductoExistente = this.productosCarro.findIndex(p => p.nombre === producto.nombre);
        if (indiceProductoExistente !== -1) {

            this.productosCarro.splice(indiceProductoExistente, 1);
        } else {
            this.productosCarro.push(producto);
        }
        this.actualizarCantidad()
        localStorage.setItem("productos", JSON.stringify(this.productosCarro));
    }

    actualizarCantidad() {
        this.cantidad.innerText = this.productosCarro.length;
    }


}

export default Carro;