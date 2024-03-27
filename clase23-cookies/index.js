const express = require("express");
const cookieParser = require ("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());

//metodo post para crear y guardar una cookie
app.post("/cookies", (req, res) => {
    const {nombre, valor, duracion } = req.body;

    //verificar si nombre y valor estan presentes
    if(!nombre || !valor) {
        return res.status(400).json({ error: "falta nombre o valor"})
    }

    //generar la cookie con o sin tiempo de expiracion
    if (duracion) {
        //VERIFICAR SI LA DURACION ES UN NUMERO POSITIVO
        if(isNaN(duracion) || duracion <= 0) {
            return res.status(400).json({ error: "duracion debe ser un numero positivo"})
        }
        res.cookie(nombre, valor, {maxAge: duracion * 1000, httpOnly: true})
    } else {
        res.cookie(nombre, valor, {httpOnly: true})
    }
    res.json({ proceso: "ok"})
})