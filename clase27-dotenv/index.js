require ("dotenv").config()

//construir el objeto de configuracion
const configuracion = {
    modo: process.env.MODO || "prod",
    puerto: parseInt(process.env.PUERTO) || 0,
    debug: process.env.DEBUG === "true" || false
}

console.log(configuracion);