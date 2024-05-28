import { recuperarDatos, guardar } from "../persintencia/persistencia.js";

async function obtenerDatos () {
    return await recuperarDatos()
}

async function crearDato (dato) {
    dato.added = Date.now()
    await guardar(dato)
    return dato
}

export {obtenerDatos, crearDato}