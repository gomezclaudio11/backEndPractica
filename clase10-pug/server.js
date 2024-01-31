const express = require("express");
const app = express()
 
app.set("views engine", "pug")
app.set("views", "./views");

app.get("/datos",(req, res) => {
    
    const min = req.query.min || 0
    const nivel = req.query.nivel || 0
    const max = req.query.max || 0
    const titulo = req.query.titulo || Medidor
    
   res.render("medidor.pug", {min, nivel, max, titulo})
})

const PORT = 3030;
app.listen(PORT, () => console.log(`escuchando en ${PORT}`))