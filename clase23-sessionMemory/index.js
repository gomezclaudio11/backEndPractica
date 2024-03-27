const express = require ("express")
const session = require ("express-session")

const app = express()

const PORT = process.env.port || 3000

//session setup
app.use(session({
    secret: "secreto",
    resave: true,
    saveUninitialized: true
}))

//guardar datos
app.get ("/con-session", (req, res) => {
    if(req.session.contador) {
        req.session.contador++
        res.send(`ud ha visitado el sito ${req.session.contador} veces`)
    }
    else {
        req.session.contador = 1
        res.send("bienvenido")
    }
})
//eliminar datos
app.get("/logout", (req, res) => {
    req.session.destroy( err => {
        if (!err) res.send("logout ok")
        else res.send({status: `logout error`, body: err})
    })
})

//LOGIN CON SESSION
app.get("/login", (req, res) => {
    const { username, password } = req.query
    if (username !== "pepe" || password !== "pepepass") {
        return res.send ("login failed")
    }
    req.session.user = username
    req.session.admin = true
    res.send("login succes!")
})

//middleware de autenticacion
function auth (req, res, next) {
    if (req.session?.user === "pepe" && req.session?.admin) {
        return next()
    }
    return res.status(401).send("error de autorizacion")
}

//aplicacion del middleware
app.get("/privado", auth, (req, res) => {
    res.send("si estas aviendo esto es xq ya te logueaste!")
})

//logout con session
app.get ("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.json ( { status: "logout error", body: err })
        }
        res.send("logout ok")
    })
})

app.listen (PORT, ()=> {
    console.log(`escuchando en puerto ${PORT}`)
})
app.on ("error", error => console.log(`error en ${error}`))

//EJERCICIO 2
/**
 const express = require('express');
const session = require('express-session');

const app = express();
app.use(express.json());
app.use(session({
  secret: 'my-secret-key',
  resave: false,
  saveUninitialized: true
}));

app.get('/', (req, res) => {
  let message = 'Te damos la bienvenida';
  if (req.session.visits === undefined) {
    req.session.visits = 1;
  } else {
    req.session.visits++;
    message = `Has visitado la página ${req.session.visits} veces`;
  }

  if (req.query.nombre) {
    req.session.nombre = req.query.nombre;
    message = `Bienvenido ${req.query.nombre}`;
  } else if (req.session.nombre) {
    message += ` ${req.session.nombre}`;
  }

  res.send(message);
});

app.get('/olvidar', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      res.status(500).json({ error: 'Error al olvidar la sesión' });
    } else {
      res.send('Hasta luego');
    }
  });
});

// Manejo de errores para rutas no encontradas
app.use((req, res, next) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Manejo de errores globales
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// Puerto en el que escucha el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

 */