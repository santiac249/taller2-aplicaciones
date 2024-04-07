class Producto{
   constructor(obj){
    this.id = obj.id;
    this.imagen= obj.imagen;
    this.nombre = obj.nombre;
    this.precio = obj.precio;
    this.descripcion = obj.descripcion;
    this.cantidad = 0;

   } 

   sumarCantidad() {
   
      this.cantidad++;
      this.actualizarInputCantidad();
      agregarProducto(this.id);
   }

  restarCantidad() {

      if (this.cantidad > 0) {
          this.cantidad--;
          agregarProducto(this.id);
          this.actualizarInputCantidad();
      }
  }

  actualizarInputCantidad() {
      const inputCantidad = document.getElementById(`cantidad-${this.id}`);
      if (inputCantidad) {
         inputCantidad.value = this.cantidad;
      }
   }

}

export default Producto;