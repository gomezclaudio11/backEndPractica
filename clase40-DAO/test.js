// test.js

const PersonasDaoMem = require('./personasDaoMem');

// Crear una instancia de PersonasDaoMem
const dao = new PersonasDaoMem();

// Agregar personas
const persona1 = dao.agregarPersona('Juan', 'Pérez', '12345678');
const persona2 = dao.agregarPersona('María', 'García', '87654321');

console.log('Todas las personas:', dao.obtenerTodasLasPersonas());

// Obtener persona por ID
const personaObtenida = dao.obtenerPersonaPorId(persona1.id);
console.log('Persona obtenida por ID:', personaObtenida);

// Modificar persona
const personaModificada = dao.modificarPersona(persona2.id, 'Ana', 'García', '87654321');
console.log('Persona modificada:', personaModificada);

// Borrar persona
const personaBorrada = dao.borrarPersona(persona1.id);
console.log('Persona borrada:', personaBorrada);

console.log('Todas las personas después de borrar:', dao.obtenerTodasLasPersonas());
