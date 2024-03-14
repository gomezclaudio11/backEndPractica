import mongoose from "mongoose";

const usuarioCollection = "usuarios";

const UsuarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  edad: { type: Number, required: true },
  dni: { type: String, required: true, unique: true },
  curso: { type: String, required: true },
  nota: { type: Number, required: true },
})

export const usuarios = mongoose.model(usuarioCollection, UsuarioSchema)