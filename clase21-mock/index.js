import express from "express"
import { faker } from '@faker-js/faker';
const app = express()
const nombres = ["luis", "lucia", "juan", "augusto"];
const apellidos = ["caceres", "gomez", "garcia", "gutierrez"];
const colores = ["rojo", "verde", "azul", "amarillo"];

//funcion para obtener un elemento aleatorio de un array
function getRandomElement (array) {
    return array[Math.floor(Math.random() * array.length)]
}

//ruta "/test" que responde con un array de 4 obj aleatorios
app.get("/test", (req, res) => {
    const objetos = [];
    for (let i = 0; i < 4; i++) {
        const nombre = getRandomElement(nombres);
    const apellido = getRandomElement(apellidos);
    const color = getRandomElement(colores)
    objetos.push({ nombre, apellido, color})    
} 
res.json(objetos)
})

//FAKER

app.get("/testFaker", (req, res) => {
    const cantidad = req.query.cant || 10 //Cantidad de objetos, por defecto 10 si no se proporciona el parámetro
    const objetos = [];
    for (let i = 0 ; i< cantidad; i++){
        const id = i + 1;
        const nombre = faker.name.firstName();
        const apellido = faker.name.lastName();
        objetos.push({id, nombre,apellido})
    }
    res.json(objetos)
    }
)
// Puerto en el que escucha el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
