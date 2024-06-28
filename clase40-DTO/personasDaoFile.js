// PersonasDaoFile.js

const fs = require('fs').promises;
const PersonaDto = require('./personaDto.js');

class PersonasDaoFile {
  constructor(filename) {
    this.filename = filename;
  }

  async init() {
    try {
      await fs.access(this.filename);
    } catch (error) {
      await fs.writeFile(this.filename, JSON.stringify([]));
    }
  }

  async _readFile() {
    const data = await fs.readFile(this.filename, 'utf-8');
    return JSON.parse(data);
  }

  async _writeFile(data) {
    await fs.writeFile(this.filename, JSON.stringify(data, null, 2));
  }

  async agregarPersona(nombre, apellido, dni) {
    const personas = await this._readFile();
    const id = personas.length > 0 ? personas[personas.length - 1].id + 1 : 1;
    const persona = new PersonaDto(id, nombre, apellido, dni);
    personas.push(persona);
    await this._writeFile(personas);
    return persona;
  }

  async obtenerTodasLasPersonas() {
    return await this._readFile();
  }

  async obtenerPersonaPorId(id) {
    const personas = await this._readFile();
    return personas.find(persona => persona.id === id) || null;
  }

  async modificarPersona(id, nombre, apellido, dni) {
    const personas = await this._readFile();
    const index = personas.findIndex(persona => persona.id === id);
    if (index !== -1) {
      if (nombre !== undefined) personas[index].nombre = nombre;
      if (apellido !== undefined) personas[index].apellido = apellido;
      if (dni !== undefined) personas[index].dni = dni;
      await this._writeFile(personas);
      return personas[index];
    }
    return null;
  }

  async borrarPersona(id) {
    const personas = await this._readFile();
    const index = personas.findIndex(persona => persona.id === id);
    if (index !== -1) {
      const [persona] = personas.splice(index, 1);
      await this._writeFile(personas);
      return persona;
    }
    return null;
  }
}

module.exports = PersonasDaoFile;
