const products = [
    {
      nombre: "cafe",
      precio: 20,
      categoria: "bebida",
      id: 1
    },
    {
      nombre: "cafe con leche",
      precio: 20,
      categoria: "bebida",
      id: 2
    },
    {
      nombre: "cafe chico",
      precio: 20,
      categoria: "bebida",
      id: 3
    },
    {
      nombre: "cafe late",
      precio: 20,
      categoria: "bebida",
      id: 4
    }
  ]

  class ProductContenedor {
    constructor () {
        this.products = products;
    }

    getAll() {
        return this.products;
    }
    deleteAll() {
        this.products = [];
        return;
    }
    getById (id) {
        const encontrarXid = this.products.find((item) => item.id === parseInt(id))
        if(!encontrarXid)
            return null;
        return encontrarXid
    }
    getId () {
        const lastProduct = this.products[this.products.length - 1];
        const lastId = lastProduct.id
        return lastId +1
    }
    save(product) {
        product.id = this.getId();
        this.products.push(product);
        return product.id;
    }
    deleteById (id){
        const productIndex = this.products.findIndex((item) => item.id === parseInt(id));
        this.products.splice(productIndex, 1); //splice 
        //elimina uno o varios elementos 1 es donde se 
        //ubica y el 2 son los elemtos a eliminar

        return;
    }
    update(id, product){
        const productIndex = this.products.findIndex((item) => item.id === parseInt(id));
        this.products.splice(productIndex, 1, { id: parseInt(id), ...product });
        return
    }
  }
/**
 La función splice en JavaScript se utiliza para cambiar 
 el contenido de un array eliminando o reemplazando 
 elementos existentes y/o agregando nuevos elementos 
 en su lugar.
 */
  module.exports = ProductContenedor