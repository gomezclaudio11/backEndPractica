const minimist = require ("minimist");

//obtener los argumentos de la linea de comandos
const args = minimist (process.argv.slice(2))

//construir el objeto basado en los argumentos
const objeto = {
    modo: args.m ||"prod",
    puerto: args.p || 0,
    debug: args.d || false,
    otros: args._
}

console.log(objeto);