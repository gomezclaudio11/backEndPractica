const { options } = require ("./index");
const knex = require ("knex")(options);

const cars = [
    {name: "audi", price: 4444},
    {name: "MERCEDES", price: 2344},
    {name: "ford", price: 7575},
    {name: "gmc", price: 8444},
]

knex("cars").insert(cars)
    .then(() => console.log("data insert"))
    .catch((err) => { console.log(err); throw err })
    .finally(() => {
        knex.destroy()
    })