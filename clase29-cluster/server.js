const express = require("express")
const app = express()
// Obtener el número de puerto del argumento de línea de 
//comandos o establecerlo en 8080 por defecto
const PORT = process.argv[2] || 8080;

//ruta raiz
app.get("/", (req, res) =>{
    const fyh = new Date().toLocaleString()
    res.send(`servidor express en ${PORT} PID ${process.pid} ${fyh}`)
    })

app.listen(PORT, () => {
    console.log(`SERVIDOR ESCUCHANDO EN ${PORT}`);
})