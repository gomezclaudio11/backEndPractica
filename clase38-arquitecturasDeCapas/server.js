import express from "express";
import routerDatos from "./routes/rutas.js";

const app = express()
app.use (express.json())

app.use("/api/datos", routerDatos)

//start server
const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`servidor express escuchando en el puerto ${
        server.address().port}`)
})
server.on("error", error => console.error("error en el servidor", error))