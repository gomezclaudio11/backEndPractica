const express = require ("express");
const session = require ("express-session");

const app = express();

//middleware para manejar sesiones
app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
}))

//middleware para parsear el body de las solicitudes
app.use(express.urlencoded({ extended: true}))

//array en memoria para almacenar usuarios regisrados
const users = [];

//ruta para la vista de registro de usuario (formulario HTML)
app.get("/registro", (req, res) => {
    res.send(`
    <form action="/registro" method="post">
    <input type="text" name="nombre" placeholder="Nombre" required>
    <input type="password" name="password" placeholder="Contraseña" required>
    <input type="text" name="direccion" placeholder="Direccion" required>
    <button type="submit">Registrarse</button>
    </form>
    `)
});

//Ruta para manejar las solicitudes POST de registro de usuarios
app.post("/registro", (req, res) => {
    const {nombre, password, direccion } = req.body;
    if(!nombre|| !password || !direccion) {
        res.status(400).send("falta nombre, contraseña o direccion")
    } else if (users.find(user => user.nombre === nombre)) {
        res.status (400).send("El usuario ya esta registrado")
    } else {
        users.push ({ nombre, password, direccion })
        res.redirect("/login")
    }
});

//ruta para el formulario de login
app.get("/login", (req, res) => {
    res.send (`
    <form action="/login" method="post">
    <input type="text" name="nombre" placeholder="Nombre" required>
    <input type="password" name="password" placeholder="Contraseña" required>
    <button type="submit">Iniciar sesión</button>
  </form>
    `)
});

//ruta para manejar las solicitudes POST de inicio de sesion
app.post ("/login", (req, res ) => {
    const {nombre, password} = req.body;
    const user = users.find(user => user.nombre === nombre && user.password === password)
    if (!user) {
        res.status(401).send("credenciales incorrectas");
    } else {
        req.session.user = user;
        res.redirect("/datos")
    }
})

//rutas para mostrar los datos del usuario
app.get("/datos", (req, res) => {
    const user = req.session.user;
    if(!user) {
        res.redirect("/login");
    } else {
        res.send(`Bienvenido ${user.nombre} tu direccion es ${user.direccion}`)
    }
})

//ruta para cerrar sesion
app.get ("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/login")
})

app.listen(3000, () => {
    console.log("SERVIDOR INICIADO EN puerto 3000")
})

/**
 La línea req.session.user = user; se utiliza para almacenar
 la información del usuario en la sesión.

En una aplicación web, las sesiones se utilizan para mantener
 el estado del usuario entre múltiples solicitudes HTTP. 
 Cuando un usuario se autentica correctamente, normalmente 
 deseamos mantener su estado de autenticación durante su 
 sesión en el sitio. La información del usuario se almacena 
 en la sesión del servidor y se asocia con un identificador 
 único de sesión, que generalmente se almacena en una cookie 
 en el navegador del cliente.

En este caso, cuando el usuario se autentica correctamente 
en la ruta /login, la información del usuario se guarda en 
req.session.user. Esto permite que la información del usuario
 esté disponible en las solicitudes posteriores mientras dure
  la sesión del usuario. Por lo tanto, cuando el usuario 
  accede a la ruta /datos, podemos verificar si el usuario 
  está autenticado revisando req.session.user. 
  Si req.session.user existe, significa que el usuario está 
  autenticado y podemos acceder a su información.


 */