const express = require('express');
const app = express();
const fs = require('fs');

// Motor de plantillas personalizado
app.engine('cte', (filePath, options, callback) => {
  fs.readFile(filePath, 'utf-8', (err, content) => {
    if (err) return callback(err);

    // Reemplazar las claves dinámicas con valores proporcionados en options
    const renderedContent = content.replace(/\^\^(\w+)$$/g, (match, p1) => {
      return options[p1] || '';
    });

    return callback(null, renderedContent);
  });
});

// Establecer el motor de plantillas personalizado
app.set('views', './views');
app.set('view engine', 'cte');

// Ruta '/cte1'
app.get('/cte1', (req, res) => {
  // Datos para la plantilla
  const data = {
    titulo: 'Título 1',
    mensaje: 'Este es un mensaje de prueba',
    autor: 'Autor 1',
    version: 1.0,
  };

  // Renderizar la plantilla
  res.render('plantilla1', data);
});

// Ruta '/cte2'
app.get('/cte2', (req, res) => {
  // Datos para la segunda plantilla
  const data = {
    nombre: 'John',
    apellido: 'Doe',
    fechaHora: new Date().toLocaleString(),
  };

  // Renderizar la segunda plantilla
  res.render('plantilla2', data);
});

// Iniciar el servidor en el puerto 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
