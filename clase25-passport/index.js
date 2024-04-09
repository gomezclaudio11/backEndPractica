const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const app = express();

// Middleware para manejar sesiones
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

// Middleware para parsear el body de las solicitudes
app.use(express.urlencoded({ extended: true }));

// Inicializar Passport
app.use(passport.initialize());
app.use(passport.session());

// Array en memoria para almacenar usuarios registrados
const users = [];

// Configurar la estrategia de autenticación local
passport.use(new LocalStrategy((username, password, done) => {
  const user = users.find(user => user.username === username && user.password === password);
  if (user) {
    return done(null, user);
  } else {
    return done(null, false, { message: 'Credenciales incorrectas' });
  }
}));

// Serializar y deserializar usuarios para la sesión
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = users.find(user => user.id === id);
  done(null, user);
});

// Ruta para la vista de registro de usuario (formulario HTML)
app.get('/registro', (req, res) => {
  res.send(`
    <form action="/registro" method="post">
      <input type="text" name="username" placeholder="Nombre de usuario" required>
      <input type="password" name="password" placeholder="Contraseña" required>
      <button type="submit">Registrarse</button>
    </form>
  `);
});

// Ruta para manejar las solicitudes POST de registro de usuario
app.post('/registro', (req, res) => {
  const { username, password } = req.body;
  const id = users.length + 1;
  if (!username || !password) {
    res.status(400).send('Falta nombre de usuario o contraseña');
  } else if (users.find(user => user.username === username)) {
    res.status(400).send('El usuario ya está registrado');
  } else {
    users.push({ id, username, password });
    res.redirect('/login');
  }
});

// Ruta para el formulario de login
app.get('/login', (req, res) => {
  res.send(`
    <form action="/login" method="post">
      <input type="text" name="username" placeholder="Nombre de usuario" required>
      <input type="password" name="password" placeholder="Contraseña" required>
      <button type="submit">Iniciar sesión</button>
    </form>
  `);
});

// Ruta para manejar las solicitudes POST de inicio de sesión
app.post('/login', passport.authenticate('local', {
  successRedirect: '/datos',
  failureRedirect: '/login',
  failureFlash: true
}));

// Ruta para mostrar los datos del usuario
app.get('/datos', (req, res) => {
  if (req.isAuthenticated()) {
    res.send(`Bienvenido, ${req.user.username}`);
  } else {
    res.redirect('/login');
  }
});

// Ruta para cerrar sesión
app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});

app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});

/**
 En el contexto de Passport.js, done es una función que se 
 utiliza para notificar a Passport sobre el resultado del 
 proceso de autenticación. Se utiliza para devolver el 
 control al middleware de Passport una vez que se ha 
 completado el proceso de autenticación.

En el caso de LocalStrategy, done se invoca con tres 
parámetros:

    error: Un objeto de error, si ocurrió algún error durante
     el proceso de autenticación. Si no hay error, este 
     parámetro es null.
    user: El objeto de usuario que se autenticó correctamente.
     Si la autenticación falló, este parámetro es false o 
     null.
    info: Un objeto opcional que contiene información
     adicional sobre el proceso de autenticación, como 
     mensajes de error personalizados.

En el código que proporcionaste, si user existe (es decir, si
     se encontró un usuario con las credenciales 
     proporcionadas y la autenticación fue exitosa), se llama
     a done con null como primer parámetro (indicando que no
     hay errores) y user como segundo parámetro (pasando
     el objeto de usuario autenticado). Esto notifica
     a Passport que la autenticación fue exitosa y proporciona
     el usuario autenticado para que Passport lo maneje 
     adecuadamente
 */
/**
 La serialización y deserialización son procesos esenciales 
 cuando se trabaja con sesiones de usuario en Passport.js.
 
 Serialización de usuario (serializeUser): En este paso, se 
 determina qué datos del usuario se deben almacenar en la
  sesión. La función serializeUser recibe un usuario como 
  entrada y llama a done con dos argumentos: un posible error
   (null si no hay error) y una clave única que identifica al
usuario en la sesión (generalmente el ID del usuario).
Este ID se utiliza para identificar al usuario en las
solicitudes subsiguientes.

 Deserialización de usuario (deserializeUser): Este paso es 
 inverso al de la serialización. Aquí, Passport toma la clave
  única que se almacenó en la sesión y la usa para recuperar
   los datos del usuario correspondientes. La función 
   deserializeUser recibe la clave única como entrada y 
   llama a done con dos argumentos: un posible error 
   (null si no hay error) y el objeto de usuario 
   correspondiente a esa clave única.
IMPORTANTE
En resumen, la serialización se utiliza para determinar qué
 datos del usuario se almacenan en la sesión, mientras que la
  deserialización se utiliza para recuperar esos datos de la
  sesión y reconstruir el objeto de usuario correspondiente.
  Esto permite a Passport mantener la sesión del usuario a
 lo largo de las solicitudes
 */
/**
 * AUTHENTICATE
 La función passport.authenticate() es un middleware
  proporcionado por Passport.js que se utiliza para autenticar
   a los usuarios durante el proceso de inicio de sesión.

    Se llama con dos argumentos:
        El primer argumento es el nombre de la estrategia
     que se utilizará para la autenticación. En este caso, 
     se utiliza 'local' para indicar que se usará la 
     estrategia LocalStrategy.
        El segundo argumento es un objeto de opciones que
     puede contener varias propiedades, entre las que se 
     incluyen:
            successRedirect: La URL a la que se redirigirá
             al usuario después de que se haya autenticado 
             con éxito.
            failureRedirect: La URL a la que se redirigirá 
            al usuario si la autenticación falla.
            failureFlash: Un booleano que indica si se deben
         mostrar mensajes flash en caso de fallo de 
         autenticación.

La función passport.authenticate() se encarga de manejar 
toda la lógica de autenticación basada en la estrategia
 especificada y redirigir al usuario según el resultado de
  la autenticación. Si la autenticación es exitosa, se 
  redirige al usuario a la URL especificada en 
  successRedirect. Si la autenticación falla, se redirige al
   usuario a la URL especificada en failureRedirect. 
   Dependiendo de la configuración, también se pueden mostrar
    mensajes flash para informar al usuario sobre el 
    resultado de la autenticación
 */
/**
 * isAuthenticate()
 * 
 La función isAuthenticated() es un método proporcionado por
  Passport.js que se utiliza para verificar si un usuario ha 
  sido autenticado correctamente durante la sesión actual. 
  Este método se adjunta al objeto req (solicitud) en Express
   y devuelve un valor booleano que indica si el usuario está
    autenticado o no.

    Si el usuario ha sido autenticado correctamente durante
     la sesión actual, isAuthenticated() devuelve true.
    Si el usuario no ha sido autenticado o la sesión no 
    contiene información de autenticación, isAuthenticated() 
    devuelve false.

En el ejemplo proporcionado, la ruta /datos utiliza 
isAuthenticated() para verificar si el usuario ha iniciado 
sesión antes de permitir el acceso a la página. Si
 isAuthenticated() devuelve true, significa que el usuario
  ha iniciado sesión y se le da la bienvenida. En caso 
  contrario, se redirige al usuario a la página de inicio de
   sesión para que inicie sesión antes de acceder a los datos
 protegidos
 */

