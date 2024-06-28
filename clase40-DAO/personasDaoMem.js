// personasDaoMem.js

class Persona {
    constructor(id, nombre, apellido, dni) {
      this.id = id;
      this.nombre = nombre;
      this.apellido = apellido;
      this.dni = dni;
    }
  }
  
  class PersonasDaoMem {
    constructor() {
      this.personas = [];
      this.nextId = 1;
    }
  
    agregarPersona(nombre, apellido, dni) {
      const persona = new Persona(this.nextId, nombre, apellido, dni);
      this.personas.push(persona);
      this.nextId++;
      return persona;
    }
  
    obtenerTodasLasPersonas() {
      return this.personas;
    }
  
    obtenerPersonaPorId(id) {
      return this.personas.find(persona => persona.id === id) || null;
    }
  
    modificarPersona(id, nombre, apellido, dni) {
      const persona = this.obtenerPersonaPorId(id);
      if (persona) {
        if (nombre !== undefined) persona.nombre = nombre;
        if (apellido !== undefined) persona.apellido = apellido;
        if (dni !== undefined) persona.dni = dni;
        return persona;
      }
      return null;
    }
  
    borrarPersona(id) {
      const index = this.personas.findIndex(persona => persona.id === id);
      if (index !== -1) {
        const [persona] = this.personas.splice(index, 1);
        return persona;
      }
      return null;
    }
  }
  
  module.exports = PersonasDaoMem;
  