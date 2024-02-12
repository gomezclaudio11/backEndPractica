const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const app = express();
//importaremos el moduloo http q sera necesario para q
//nuestros sockets funciones
const httpServer = new HttpServer(app);
const io = new IOServer (httpServer);

//Indicamos que queremos cargar los archivos estaticos que
//se encuentran en dicha carpeta
app.use(express.static("./public"))

//Esta ruta carga nuestro archivo index.html en la raiz
// de la misma
app.get("/", (req, res) => {
    res.sendFile("index.html", {root: __dirname})
})

//El servidor funcionando en el puerto 3000
httpServer.listen(3000, () => console.log("server on"))

//Servidor
//envios de datos al cliente(servidor)
io.on("connection", socket => {
    console.log("usuario conectado")
    socket.emit("mi mensaje", "este es mi mensaje desde el servidor")

    //Recepcion de daros del cliente
socket.on("notificacion", data => {
    console.log(data);
})
})
//al utilizar el objeto socket accedemos a sus metodos
//entre ellos emit() que nos permite enviar un mensaje
//del servidor al cliente
//el 1° parametro q recibe es el nombre de nuestro evento
//2° es la info que queremos transmitir

