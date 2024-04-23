// Realizar la suma incremental
let suma = 0;
for (let i = 0; i <= 1000; i++) {
    suma += i;
}

// Enviar el resultado al proceso padre
process.send(suma);

// Salir del proceso hijo
process.exit(0);
