const { options } = require ("./index");
const knex = require ("knex")(options);


knex.from("cars").where("price", "8444").update({price: 9500})
.then(() =>console.log("car update"))
.catch((err) => {console.log(err); throw err})
.finally(() => {
    knex.destroy()
})