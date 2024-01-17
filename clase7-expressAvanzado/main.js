/**EJERCICIO 1 */
/*
const frase = "hola mundo"
const express = require ("express")
const app = express ()
const PORT = 8080
const server = app.listen( PORT, () => {
   console.log(`servidor escuchando en ${server.address().port}`);
})

server.on("error", error => console.log(`error en el servidor ${error}`))

app.get ("/api/frase", (req, res) => {
    res.send(`frase: ${frase}`)
})

app.get ("/api/letras/:num", (req, res) => {
    const num = parseInt(req.params.num);
    if (num >= 1 && num <= frase.length) {
        const letra = frase.charAt(num - 1)
        res.json ({letra: letra})
    } else {
        res.status(400).json ({error: "numero de orden invalido"})
    }

})
app.get ("/api/palabras/:num", (req, res) => {
    const num = parseInt(req.params.num);
    const palabras = frase.split(" ")
    if (num >= 1 && num <= palabras.length) {
        const palabra = palabras[ num -1]
        res.json({palabra: palabra})
    } else {
        res.status (400).json({error: "numero de orden invalido"})
    }
})
*/

/**EJERCICIO 2 */
/** 
const express = require ("express");
const app = express();
const PORT = 8080;

const server = app.listen( PORT, () => {
  console.log(`servidor escuchando en ${server.address().port}`);  
})
server.on ("error", error => console.log(`error en el servidor /¡${error}`))

app.get("/api/sumar/:num1/:num2", (req, res) =>{
    const num1 = parseInt( req.params.num1)
    const num2 = parseInt(req.params.num2)
    const resultado = num1 + num2
    res.send({resultado: resultado})
} )

app.get ("/api/sumar", (req, res) => {
    const num1 = parseInt (req.query.num1)
    const num2 = parseInt (req.query.num2)
    const resultado = num1 + num2
    res.json({resultado: resultado})
})

app.get ("/api/operacion/:operacion", (req, res) => {
    const operacion = req.params.operacion
    const resultado = eval(operacion)
    res.json({resultado : resultado})
})

app.post ("/api", (req, res) => {
    res.send("ok post")
})
app.put ("/api", (req, res) => {
    res.send("ok put")
})
app.delete ("/api", (req, res) => {
    res.send("ok delete")
})
*/

/**EJERCICIO 3 */

const express = require ("express")
const app = express()
const PORT = 8080
app.use(express.json())
const server = app.listen(PORT, () => {
    console.log(`servidor escuchando ${server.address().port}`);
})
server.on ("error", error => console.log(`error ${error}`))

let frase ="frase inicial"
app.get("/api/frase", (req, res) => {
    res.json ({frase:frase})
})
app.get("/api/palabras/:pos", (req, res) => {
    const num = parseInt (req.params.pos)
    const dividirPalabra = frase.split(" ")
    console.log(dividirPalabra);
    if (num >= 1 && num<= dividirPalabra.length){
    const palabra = dividirPalabra [num -1]
    res.json ({buscada : palabra})
}else {
    res.status (400).json({error: "numero de orden invalido"})
}
})

app.post ( "/api/palabras", (req, res) => {
    const nuevaPalabra = req.body.palabra;
    const palabras = frase.split(' ');
  
    palabras.push(nuevaPalabra);
    frase = palabras.join(' ');
  
    const pos = palabras.length;
    res.json({ agregada: nuevaPalabra, pos: pos })
})

app.put ("/api/palabras/:pos", (req, res) => {
    const pos = req.params.pos
    const nuevaPalabra = req.body.palabra;
    const palabras = frase.split(" ")

    if (pos >= 1 && pos <= palabras.length) {
        const anterior = palabras [pos -1];
        palabras [ pos - 1] = nuevaPalabra;
        frase = palabras.join(" ");

        res.json({ actualizada: nuevaPalabra, anterior: anterior})
    }else {
        res.status(400).json({ error: 'Posición inválida' });
    }
    })