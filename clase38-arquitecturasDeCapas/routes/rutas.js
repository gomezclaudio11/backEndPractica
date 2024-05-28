import {Router} from "express"
import { getDatosController, posDatosController } from "../controller/controlador.js"

const routerDatos = new Router()

routerDatos.get("/", getDatosController)
routerDatos.post("/", posDatosController)

export default routerDatos