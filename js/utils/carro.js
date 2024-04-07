class Carro {

    constructor(obj) {
        this.productosCarro = obj.productosCarro;
        this.cantidad = obj.cantidad
    }

    agregarProducto(producto) {
        const indiceProductoExistente = this.productosCarro.findIndex(p => p.id === producto.id);
        let cantidad = 0
        if (indiceProductoExistente !== -1) {
            this.productosCarro[indiceProductoExistente].cantidad += 1;
            cantidad = this.productosCarro[indiceProductoExistente].cantidad;
        } else {
            producto.cantidad = 1;
            this.productosCarro.push(producto);
            cantidad = 1;
        }
        this.actualizarInputCantidad(producto.id, cantidad);
        this.actualizarCantidad()
        localStorage.setItem("productos", JSON.stringify(this.productosCarro));

    }

    eliminarProducto(productId) {
        const indiceProductoExistente = this.productosCarro.findIndex(p => p.id === productId);
        let cantidad = 0
        if (indiceProductoExistente !== -1) {

            if (this.productosCarro[indiceProductoExistente].cantidad === 1) {
                this.productosCarro.splice(indiceProductoExistente, 1);
                cantidad = 0;
                mostrarProductosCarro()
            } else {
                this.productosCarro[indiceProductoExistente].cantidad--;
                cantidad = this.productosCarro[indiceProductoExistente].cantidad;
            }

        }
        this.actualizarInputCantidad(productId, cantidad);
        this.actualizarCantidad()
        localStorage.setItem("productos", JSON.stringify(this.productosCarro));
    }

    actualizarInputCantidad(id, cantidad) {
        const inputCantidad = document.getElementById(`cantidad-${id}`);
        const inputCantidadCarrito = document.getElementById(`cantidad-carrito-${id}`);
        if (inputCantidad) {
            inputCantidad.value = cantidad;
        }
        if (inputCantidadCarrito) {
            inputCantidadCarrito.value = cantidad;
        }
    }


    actualizarCantidad() {
        this.cantidad.innerText = this.productosCarro.length;
    }

}

export default Carro;