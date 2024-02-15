const { Socket } = require("dgram");
const express = require ("express")
const http = require("http");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server)

const messages = []

app.use(express.static("public"));

io.on("connection", (socket) =>{
    // Envía mensajes existentes al nuevo usuario
    socket.emit("chatHistory", messages);

    socket.on("chatMessage", (message) => {
        messages.push(message)
         // Envía el nuevo mensaje a todos los usuarios
         io.emit("chatMessage", message)
    })
})

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`escuchando en ${PORT}`);
})