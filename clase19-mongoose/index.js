import mongoose from "mongoose";
import * as model from "./models/usuario.js";


CRUD()

async function CRUD() {
    try {
        //conexion hacia la base de datos
        const URL = 'mongodb://localhost/colegio'
        let rta = await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology:true
        })
        console.log("base de datos conectada");
        
        //CREATE
        /*
        console.log("create");
        const usuario = {nombre: "ale", apellido: "gomez", edad: 33, dni: 34567890, curso: "js", nota: 10}
        const usuarioSaveModel = new model.usuarios(usuario);
        let usuarioSave = await usuarioSaveModel.save()
        console.log(usuarioSave);
        */
        //read 
        console.log("read");
        let usuarios = await model.usuarios.find({})
        console.log(usuarios);

        //update
        console.log("update");
        let usuarioUpdate = await model.usuarios.updateOne ( {nombre: "ale"}, {
            $set: {edad: 44}
        })
        console.log(usuarioUpdate);
        /*
        //delete
        console.log("delete");
        let usuarioDelete= await model.usuarios.deleteOne (
            {nombre: "ale"}
        )
        console.log(usuarioDelete);
            */
    }
    catch(error) {
        console.log("error  en crud");
    }
}