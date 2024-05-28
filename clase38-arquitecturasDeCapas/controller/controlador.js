import { obtenerDatos, crearDato } from "../service/servicio.js";

async function getDatosController (req, res) {
    const datos = await obtenerDatos()
    res.json(datos)
}

async function posDatosController (req, res) {
    const dato = req.body
    await crearDato (dato)
    res.status(201).json(dato)
}

export {getDatosController, posDatosController}