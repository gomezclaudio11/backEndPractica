import { MongoClient } from "mongodb";

async function main () {
    const url = "mongodb+srv://ecommerce:ecommerce@cluster0.e0dov1u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    const client = new MongoClient(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true 
    })
    try {
        await client.connect();
        console.log("conectado a la base de datos");

        const database = client.db("repaso");
        const collection = database.collection("usuarios");

        //insertar documentos
        await collection.insertMany([
            { nombre: 'Lucas', apellido: 'Blanco', dni: '30355874' },
            { nombre: 'María', apellido: 'García', dni: '29575148' },
            { nombre: 'Tomas', apellido: 'Sierra', dni: '38654790' },
            { nombre: 'Carlos', apellido: 'Fernández', dni: '26935670' }
        ])

        // Listar los documentos finales
    const usuarios = await collection.find().toArray();
    console.log('Usuarios finales:');
    console.log(usuarios);
    } catch (error) {
        console.error('Error al conectar o realizar operaciones:', error);
    } finally {
        await client.close();
        console.log('Conexión cerrada');
      }
}

main()