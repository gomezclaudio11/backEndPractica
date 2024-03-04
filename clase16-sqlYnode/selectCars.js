const { options } = require ("./index");
const knex = require ("knex")(options);

//seleccionamos todas las filas con la funcion select
// esta vez hemos elegido la tabla con la funcion 
//from() luego, revisamos la matriz de filas devuelta e 
//imprimimos los campos
knex.from("cars").select("*")
.then((rows) =>{
    for (row of rows){
        console.log(`${row["id"]} ${row["name"]} ${row["price"]}`);
    }
}).catch((err) => {console.log(err); throw err})
.finally(() => {
    knex.destroy()
})