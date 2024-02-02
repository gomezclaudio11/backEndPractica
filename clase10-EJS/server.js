const express = require("express");
const app = express();

app.set("views engine", "ejs");
app.set('views', './views'); // Asegúrate de tener un directorio 'views' en tu proyecto

// Middleware para parsear los datos del formulario
app.use(express.urlencoded({ extended: true }));

// Array para almacenar datos históricos
const datosHistoricos = [];

// Ruta raíz con el formulario y la tabla de datos históricos
app.get('/', (req, res) => {
  res.render('formulario.ejs', { datosHistoricos });
});

// Ruta para manejar la petición POST  del formulario
app.post('/personas', (req, res) => {
  const { nombre, apellido, edad } = req.body;

  // Validar que se ingresen todos los datos
  if (nombre && apellido && edad) {
    // Agregar nuevos datos al array de históricos
    datosHistoricos.push({ nombre, apellido, edad });

    // Redirigir a la ruta raíz para mostrar el formulario actualizado
    res.redirect('/');
  } else {
    // Si no se ingresaron todos los datos, mostrar mensaje de error
    res.send('Por favor, ingrese todos los datos.');
  }
});

const PORT = 8080
app.listen (PORT, console.log(`escuchando en puerto${PORT}`))