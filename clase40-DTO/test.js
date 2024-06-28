// test.js

const PersonasDaoMem = require('./personasDaoMem.js');
const PersonasDaoFile = require('./personasDaoFile.js');
const fs = require('fs').promises;

async function testDao(dao) {
  await dao.init();
  
  console.log('Agregando personas...');
  const persona1 = await dao.agregarPersona('Juan', 'Pérez', '12345678');
  const persona2 = await dao.agregarPersona('María', 'García', '87654321');
  console.log('Personas agregadas:', persona1, persona2);
  
  console.log('Obteniendo todas las personas...');
  const todasLasPersonas = await dao.obtenerTodasLasPersonas();
  console.log('Todas las personas:', todasLasPersonas);
  
  console.log('Obteniendo persona por ID...');
  const personaObtenida = await dao.obtenerPersonaPorId(persona1.id);
  console.log('Persona obtenida por ID:', personaObtenida);
  
  console.log('Modificando persona...');
  const personaModificada = await dao.modificarPersona(persona2.id, 'Ana', 'García', '87654321');
  console.log('Persona modificada:', personaModificada);
  
  console.log('Borrando persona...');
  const personaBorrada = await dao.borrarPersona(persona1.id);
  console.log('Persona borrada:', personaBorrada);
  
  console.log('Obteniendo todas las personas después de borrar...');
  const todasLasPersonasDespuesDeBorrar = await dao.obtenerTodasLasPersonas();
  console.log('Todas las personas después de borrar:', todasLasPersonasDespuesDeBorrar);
}

(async () => {
  console.log('--- Probando PersonasDaoMem ---');
  const daoMem = new PersonasDaoMem();
  await testDao(daoMem);
  
  console.log('\n--- Probando PersonasDaoFile ---');
  const daoFile = new PersonasDaoFile('personas.json');
  await testDao(daoFile);
  
  // Limpiar archivo de prueba
  await fs.unlink('personas.json');
})();
