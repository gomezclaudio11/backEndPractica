const { Socket } = require("dgram");
const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require ("socket.io");
const app = express()

const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.static("./public"))

app.get("/", (req, res) => {

})

const messages = [
    {author: "juan", text: "hola que tal"},
    {author: "pedro", text: "muy bien, vos?"},
    {author: "ana", text: "genial"},
]

io.on("connection", socket => {
    console.log("cliente conectado");
    socket.emit("messages", messages);

    socket.on("new-menssage", data => {
        messages.push (data);
        io.sockets.emit("messages", messages)
    })
})
httpServer.listen(8080, ()=> console.log("server on"))