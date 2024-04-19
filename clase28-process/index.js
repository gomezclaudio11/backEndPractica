//obtener los argumentos de la linea de comandos

const args = process.argv.slice(2);

//verificar si se han proporcionado argumentos
if (args.length === 0 ) {
    const error = {
        descripcion: "entrada vacia"
    }
    console.error(error);
    process.exit(-4);
}

//iniciar variables para calcular el promedio el max y el min
let suma = 0
let min = Infinity;
let max = -Infinity;
const numeros = [];
/**
 En JavaScript, Infinity es un valor especial que representa
  un número positivo infinito. Es utilizado comúnmente para 
  inicializar variables que se utilizarán para almacenar 
  valores máximos o mínimos en comparaciones. Por ejemplo, 
  al inicializar min con Infinity, cualquier número que se 
  compare con min será menor que Infinity, lo que garantiza 
  que el primer número comparado se convertirá en el nuevo 
  mínimo. Del mismo modo, al inicializar max con -Infinity,
   cualquier número que se compare con max será mayor que 
   -Infinity, lo que garantiza que el primer número comparado
    se convertirá en el nuevo máximo.
 */

//verificar si los argumentos son numeros validos
for (let i = 0; i < args.length; i++) {
    const num = parseFloat(args[i]);
    if (isNaN(num)) {
        const error = {
            descripcion: "error tipo",
            numeros: args,
            tipos: args.map(arg => typeof arg)
        }
        console.error(error);
        process.exit(-5);
    }
    suma += num;
    min = Math.min(min, num)
    max = Math.max (max, num);
    numeros.push(num)
}
/**
 suma += num;: Esta línea agrega el número actual (num) al
  valor acumulado de la suma. Es útil para calcular el
   promedio más adelante.

min = Math.min(min, num);: Esta línea compara el número 
actual (num) con el valor mínimo actual (min) utilizando
 Math.min(). Si num es menor que min, actualiza el valor de
  min para que sea igual a num.

max = Math.max(max, num);: Similar a la línea anterior, esta 
compara el número actual (num) con el valor máximo actual 
(max) utilizando Math.max(). Si num es mayor que max,
 actualiza el valor de max para que sea igual a num.

numeros.push(num): Agrega el número actual (num) al arreglo 
numeros, que se utiliza para almacenar todos los números 
ingresados. Esto permite que los números ingresados estén 
disponibles para su posterior procesamiento o para cualquier 
otro propósito
 */
// Calcular el promedio
const promedio = suma / args.length;

// Construir el objeto de datos
const datos = {
  numeros: numeros,
  promedio: promedio,
  min: min,
  max: max,
  ejecutable: process.argv[1],
  pid: process.pid
};

// Imprimir el objeto por consola
console.log({ datos });