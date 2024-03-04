const { options } = require ("./index");
const knex = require ("knex")(options);

(async () =>{
    try{
        console.log("borramos todos los autos");
        await knex("cars").del()
        
        console.log("insertamos autos");
        await knex("cars").insert(cars)

        console.log("leemos todos los autos");
        let rows = await knex.from("cars").select("*")
        for (row of rows) console.log(`${row["id"]} ${row["name"]} ${row["price"]}`);

        console.log("insertamos un auto mas");
        await knex("cars").insert({name: "fiat", price: 7777})

        console.log("leemos los autos actualizados");
        rows = await knex.drom("cars").select("*")
        for (row of rows) console.log(`${row["id"]} ${row["name"]} ${row["price"]}`);

    }
    catch(err) {
        console.log(err);
    }
    finally {
        knex.destroy()
    }
})()