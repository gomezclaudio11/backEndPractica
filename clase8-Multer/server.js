const express = require ("express")
const multer = require ("multer")
const path = require ("path")

const app = express()
const puerto = 8080

//configuracion de multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads")
    },
    filename: (req, file, cb) => {
        const timestamp = Date.now()
        const extemsion = path.extname(file.originalname)
        cb(null, `${timestamp}-${file.originalname}`)
    }
})

const upload = multer({storage: storage})

//configuar express para archivos estaticos
app.use(express.static("public"))

//ruta para servir el formulario html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"))
})

//ruta para manejar subida de archivos
app.post("/upload", upload.single("archivo"), (req, res) => {
    res.send("archivo subido correctamente")
})

//iniciar el servidor
const server = app.listen(puerto, () => {
    console.log(`servidor express escuchando en ${puerto}`);
})

server.on("error", (error) => {
    console.error(`error${error}`);
})

/**
 La configuración de multer en la constante storage se 
 refiere a cómo y dónde se almacenarán los archivos que 
 se suban al servidor. multer permite personalizar el
  sistema de almacenamiento de archivos para adaptarse 
  a las necesidades específicas del proyecto.

En la configuración de multer, se utiliza el objeto 
diskStorage para especificar el sistema de almacenamiento 
en disco. Aquí hay una explicación de los campos 
utilizados en la configuración:
 * 
     destination: Esta función define el directorio donde
      se almacenarán los archivos. En este ejemplo, se 
      especifica la carpeta 'uploads/' como destino. 
      Puedes ajustar esta ruta según tus necesidades.

    filename: Esta función define cómo se nombrará cada 
    archivo almacenado. En este caso, se utiliza un
     timestamp seguido del nombre original del archivo. 
     Esto se hace para asegurar que los nombres de los 
     archivos sean únicos. Puedes personalizar esta
     función según tus necesidades.
        timestamp: Se utiliza Date.now() para obtener un 
        timestamp actual.
        file.originalname: Es el nombre original del 
        archivo que se está subiendo.

Ambas funciones reciben req, file, y cb como parámetros:

    req: Es la solicitud HTTP recibida.
    file: Es el objeto que representa el archivo subido.
     Contiene información sobre el archivo, como el nombre
      original, el tamaño, etc.
    cb: Es una función de devolución de llamada (callback)
     que se llama para indicar a multer dónde almacenar 
     el archivo y con qué nombre.

Es importante mencionar que en el código de ejemplo se 
usa el módulo path para obtener la extensión del archivo 
(path.extname(file.originalname)) y asegurarse de que el
 nombre del archivo generado tenga la misma extensión que 
 el archivo original. Este es un ejemplo de cómo puedes 
 personalizar la generación de nombres de archivos según 
 tus necesidades específicas.
 */

