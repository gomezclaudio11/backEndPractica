const fs = require ("fs")

class Contenedor {
    constructor (ruta) {
        this.ruta = ruta;
    }
    async save (obj) {
        try {
            const dataArch = await fs.promises.readFile (this.ruta, "utf8");

            const dataArchParse = JSON.parse(dataArch)

            if (dataArchParse.length) {
                await fs.promises.writeFile(this.ruta, JSON.stringify( [...dataArchParse, { ...obj, id: dataArchParse[dataArchParse.length - 1].id + 1 } ], null, 2))                              
            } else {
                await fs.promises.writeFile(this.ruta, JSON.stringify( [{ ...obj, id: 1 }], null, 2))                
            }
             console.log(`El archivo tiene el id: ${dataArchParse[dataArchParse.length - 1].id + 1}`)
        } catch (error) {
            console.log(error);
        }
    }
       async getById (id) {
            try {
                const dataArch = await fs.promises.readFile (this.ruta, "utf8");

                const dataArchParse = JSON.parse(dataArch)

                let producto = dataArchParse.find(producto => producto.id === id)
                if (producto){
                    console.log(producto);
                } else {
                    console.log("no se encontro el producto");
                }
            } catch (error) {
                console.log(error);
            }
        }

        async getAll () {
            try {
                const dataArch = await fs.promises.readFile (this.ruta, "utf8");

                const dataArchParse = JSON.parse(dataArch)

                if (dataArchParse.length) {
                    console.log(dataArchParse);
                    return dataArchParse
                }else {
                    console.log("no hay productos");
                    return null
                }
            } catch (error) {
                console.log(error);
            }
        }

        async deleteById (id) {
            const dataArch = await fs.promises.readFile (this.ruta, "utf8");
            const dataArchParse = JSON.parse(dataArch)

            let producto = dataArchParse.find(prod => prod.id === id)

            if (producto) {
                // Filtrar el array para excluir el producto con el ID proporcionado
                const dataArchParseFiltrado = dataArchParse.filter(prod => prod.id !== id)
                
                // Escribir de nuevo en el archivo el array filtrado
                await fs.promises.writeFile(this.ruta, JSON.stringify(dataArchParseFiltrado, null, 2), 'utf-8')
                console.log("producto eliminado");
            } else {
                console.log("NO EXISTE EL PRODUCTO");
            }
        }
    async deleteAll () {
        try {
            await fs.promises.writeFile(this.ruts, JSON.stringify([], null, 2), "utf8")
            
        } catch (error) {
            console.log(error);
        }
    }
    }


const nuevoProd = new Contenedor ("producto.txt")

//nuevoProd.save({nombe: "leche", precio: 20, categoria: "bebida"});

nuevoProd.getById(5)

nuevoProd.getAll()

nuevoProd.deleteById(2)

//nuevoProd.deleteAll()