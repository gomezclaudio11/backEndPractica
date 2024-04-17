const yargs = require('yargs');

// Configuración de yargs
const argv = yargs
  .usage('Uso: $0 <otros..> [opciones]')
  .example('$0 1 2 3 --modo dev --puerto 8080 --debug', 'Construir objeto en modo desarrollo')
  .example('$0 1 2 3', 'Construir objeto en modo producción')
  .options({
    'modo': {
      alias: 'm',
      describe: 'Modo de ejecución',
      default: 'prod',
      choices: ['dev', 'prod']
    },
    'puerto': {
      alias: 'p',
      describe: 'Número de puerto',
      default: 0,
      type: 'number'
    },
    'debug': {
      alias: 'd',
      describe: 'Habilitar el modo de depuración',
      default: false,
      type: 'boolean'
    }
  })
  .help('h')
  .alias('h', 'help')
  .argv;

// Obtener los argumentos no reconocidos
const otros = argv._;

// Construir el objeto
const objeto = {
  modo: argv.modo,
  puerto: argv.puerto,
  debug: argv.debug,
  otros
};

// Mostrar el objeto por pantalla
console.log(objeto);
