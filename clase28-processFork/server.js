const express = require ("express")
const { fork } = require ("child_process");

const app = express()

let visitas = 0;

//ruta raiz para contar visitas
app.get("/", (req, res) => {
    visitas++;
    res.send (`cantidad de visitas totales: ${visitas}`)
});

//ruta para el calculo bloqueante
app.get("/calculo-bloq", (req, res)=> {
    //realizar la suma incremental
    let suma = 0;
    for(let i = 0; i <= 1000; i++){
        suma += i;
    }
    res.send(`resultado del calculo bloqueante:${suma}`)
})

//ruta para el calculo no bloqueante
app.get("/calculo-nobloq", (req, res) => {
    // Flag para controlar si ya se envió la respuesta
    let responded = false;

    //fork dek proceso hijo para realizar el calculo no bloqueante
    const worker = fork("./worker.js");

    //manejar los mensajes del proceso hijo
    worker.on("message", message => {
        // Verificar si ya se envió la respuesta
        if (!responded) {
        //enviar el resultado al cliente
        res.send(`resultado del calculo no bloqueante: ${message}`)
         // Marcar como respondido
         responded = true;
        //cerrar el proceso hijo
        worker.kill();
        }
    })

    
    // Manejar errores del proceso hijo
    worker.on('error', err => {
        console.error('Error en el proceso hijo:', err);
        // Verificar si ya se envió la respuesta
        if (!responded) {
        // Enviar un mensaje de error al cliente
        res.status(500).send('Error en el cálculo no bloqueante');
    // Marcar como respondido
    responded = true;
        }
    });

    // Manejar la finalización del proceso hijo
    worker.on('exit', code => {
        if (!responded) {
        if (code !== 0) {
            console.error(`El proceso hijo salió con el código de salida ${code}`);
            // Enviar un mensaje de error al cliente si el proceso hijo falla
            res.status(500).send('Error en el cálculo no bloqueante');
        } else {
            // Enviar un mensaje de error al cliente si no se recibió respuesta
            res.status(500).send('No se recibió respuesta del cálculo no bloqueante');
        }
        // Marcar como respondido
        responded = true;
    }
    });
});

// Puerto de escucha del servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
