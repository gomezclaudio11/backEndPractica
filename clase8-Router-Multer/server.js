const express = require ("express");
const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))

const mascotas = [];
const personas = [];

const mascotasRouter = express.Router();
const personasRouter = express.Router();

mascotasRouter.get("/", (req, res) => {
    res.json(mascotas)
})
mascotasRouter.post ("/", (req, res) => {
    const nuevaMascota = req.body;
    mascotas.push(nuevaMascota)
    res.json(nuevaMascota)
})

personasRouter.get('/', (req, res) => {
    res.json(personas);
  });
  
  personasRouter.post('/', (req, res) => {
    const nuevaPersona = req.body;
    personas.push(nuevaPersona);
    res.json(nuevaPersona);
  });

  //usar las rutas base en las rutas principales
  app.use("/mascotas", mascotasRouter)
  app.use("/personas", personasRouter)

const server = app.listen ( PORT, () => {
    console.log(`escuchando en ${server.address().port }`);
})
server.on ("error", error => console.log(`error ${error}`))


