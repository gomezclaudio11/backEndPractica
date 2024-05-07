const cluster = require('cluster');
const os = require('os');
const express = require('express');

if (cluster.isMaster) {
    const numCPUs = os.cpus().length;
    console.log(`Número de procesadores detectados: ${numCPUs}`);

    // Crear un worker por cada procesador
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    // Evento para manejar la caída de un worker
    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} se ha caído`);
        // Reiniciar el worker
        cluster.fork();
    });
} else {
    const app = express();
    const PORT = process.argv[2] || 8080;

    app.get('/', (req, res) => {
        const currentDate = new Date().toLocaleString();
        res.send(`Servidor express en ${PORT} - PID ${process.pid} - ${currentDate}`);
    });

    app.listen(PORT, () => {
        console.log(`Servidor escuchando en el puerto ${PORT} - PID ${process.pid}`);
    });
}
