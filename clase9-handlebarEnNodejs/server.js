const express = require ("express");
const app = express();
//cargo el modulo handlebars
const exphbs = require("express-handlebars")

//establecemos la configuracion de handlerbars
app.engine("hbs", exphbs({
        extname: ".hbs", 
        defaultLayout: "index", 
        layoutsDir: __dirname + "/views/layouts", 
        partialsDir: __dirname + "/views/partials"
    }));
 //nombre referencia a la plantilla(se usa luego en set)
//funcion de configuracion handlebars
// plantilla principal
//ruta a la plantilla principal
// ruta a los partials


//establecemos el motor de plantilla que se utiliza
app.set("view engine", "hbs");

//establecemos directorio donde se encuentran los archivos de plantilla
app.set("viewa", "./views");

//espacio publico del servidor
app.use(express.static("public"));

fakeApi = () => [
    { name: "katarina", lane: "midlaner" },
    { name: "jayce", lane: "toplaner" },
    { name: "heimerdinger", lane: "toplaner" },
    { name: "kata", lane: "midlaner" },
    { name: "Asir", lane: "midlaner" }
]

app.get("/", (req, res) => {
    //sirve el cuerpo de la pagina "main.hbs" en el contenedor "index.hbs"
    res.render("main", {suggestedChamps: fakeApi(), listExists: true});
});

const port = 8080

app.listen(port, err => {
    if(err) throw new Error (`error en servidor ${err}`)
    console.log(`el servidor esta en ${port}`);
})