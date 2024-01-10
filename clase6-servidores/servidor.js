/**EJERCICIO 1 */
/*
const http = require("http")
const server = http.createServer (( peticion, respuesta) => {
    respuesta.end(mensaje)
})


const connectedServer = server.listen (8080, () => {
    console.log (`servidor http escuchando en el puerto 
    ${connectedServer.address().port}`)
})

const horaActual = new Date()
const saludo = horaActual.toLocaleTimeString()
const hora = horaActual.getHours()

console.log(hora);
console.log(saludo);

let mensaje;
    if (hora < 12 ) {
        mensaje =" buenos dias";
    } else if (hora > 12 & hora < 19 ) {
        mensaje = "buenas tardes";
    } else { 
        mensaje = "buenas noches";
    }
*/

/**EJERCICIO 2 */
/*
const express = require ("express")
const app = express()
const PORT = 8080
const server = app.listen ( PORT, () => {
   console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`error en el servidor ${error}`))
   
app.get ("/", (req, res) => {
   res.send(`<h1 style = "color: blue"> Bienvenidos al servidor express</h1>`)
})
let contadorVisitas = 0
app.get("/visitas", (req, res) => {
    contadorVisitas++;
    res.send(`la cantidad de visitas es ${contadorVisitas}`)
})
*/
/**Cada vez que se recibe una solicitud en la ruta /visitas, 
 * se incrementa contadorVisitas en 1 antes de enviar la 
 * respuesta. La razón por la cual se mantiene entre 
 * solicitudes es porque es una variable global y su estado
 *  persiste en el servidor mientras este se encuentra en 
 * ejecución. */
/*
const fyh = new Date ().toLocaleString() 
app.get("/fyh", (req, res) => {
    res.send({fyh})
})
*/

/**ejercicio 3 */

const express = require ("express")
const app = express()
const PORT = 8080
const server = app.listen ( PORT, () => {
   console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`error en el servidor ${error}`))

const Contenedor = require ("./claseContenedor.js")
const claseContenedor = new Contenedor ("./producto.txt")

app.get("/productos", async (req, res) => {
    res.send(
         await claseContenedor.getAll())
} )

app.get("/productosRandom", async (req, res) => {
    const allProducts = await claseContenedor.getAll()
    const random = parseInt (Math.random() * allProducts.length)
    res.send(
        await allProducts[random]
    )
})