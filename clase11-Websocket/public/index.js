const socket = io() // ya podemos empezar a usar los socket
                    //desde el cliente
//cliente
//recepcion de datos del servidor(cliente)
socket.on("mi mensaje", data => {
    alert(data)
})

//Envio de datos al servidor (cliente)
socket.on("mi mensaje", data => {
    alert(data)
    socket.emit("notificaciones", "mensaje recibido exitosamente")
})