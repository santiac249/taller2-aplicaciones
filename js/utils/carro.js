class Carro {

    constructor(obj) {
        this.productosCarro = obj.productosCarro;
        this.cantidad = obj.cantidad
    }

    agregarProducto(producto) {
        const indiceProductoExistente = this.productosCarro.findIndex(p => p.id === producto.id);
        if (indiceProductoExistente !== -1) {
           
            if (producto.cantidad === 0) {
                this.eliminarProducto(producto.id);
                return;
            }
            this.productosCarro[indiceProductoExistente].cantidad = producto.cantidad;
           
        } else {
            this.productosCarro.push(producto);
        }
        this.actualizarCantidad()
        localStorage.setItem("productos", JSON.stringify(this.productosCarro));
    }

    eliminarProducto(productoId){
        const indiceProductoExistente = this.productosCarro.findIndex(p => p.id === productoId);
        this.productosCarro.splice(indiceProductoExistente, 1);
        this.actualizarCantidad()
        localStorage.setItem("productos", JSON.stringify(this.productosCarro));
    }

    actualizarCantidad() {
        this.cantidad.innerText = this.productosCarro.length;
    }

}

export default Carro;