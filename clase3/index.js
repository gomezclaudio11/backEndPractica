const fs = require('fs').promises;

const leerArchivoPackageJSON = async () => {
  try {
    // A) Ejecutar npm init -y en la terminal
    console.log("Ejecutando 'npm init -y'...");
    await ejecutarComando("npm init -y");

    // B) Leer el contenido de package.json
    console.log("Leyendo el contenido de package.json...");
    const contenidoStr = await fs.readFile('package.json');
    const contenidoObj = JSON.parse(contenidoStr);

    // Mostrar el objeto info
    const info = {
      contenidoStr,
      contenidoObj,
    };
    console.log("Objeto info:", info);

    // D) Guardar el objeto info en un archivo llamado info.txt
    console.log("Guardando el objeto info en info.txt...");
    await fs.writeFile('info.txt', JSON.stringify(info, null, 2), "utf-8");
    console.log("Archivo info.txt creado con éxito.");
  } catch (error) {
    // E) Manejo de errores
    console.error("Error:", error.message);
  }
};

const ejecutarComando = async (comando) => {
  const { exec } = require('child_process');
  return new Promise((resolve, reject) => {
    exec(comando, (error, stdout, stderr) => {
      if (error) {
        reject(new Error(`Error ejecutando el comando: ${stderr || stdout}`));
      } else {
        resolve();
      }
    });
  });
};

// Ejecutar la función principal
leerArchivoPackageJSON();

const leerArchivoInfo = async () => {
    try {
        const contenido = await fs.readFile("info.txt", "utf8");
        const info = JSON.parse (contenido)
        console.log( `este es el archivo info: ${info}`);
    } catch (error) {
        console.log(error);
    }
}
leerArchivoInfo()