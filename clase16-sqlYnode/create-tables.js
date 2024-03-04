const {options} = require ("./index")
const knex = require ("knex")(options);

knex.schema.createTable('cars', table => {

    //Columns
    
      table.increments('id')
      table.string('name')
      table.integer('price')
      
    })
    .then(() => console.log("table create"))
    .catch((err) => { console.log(err); throw err})
    .finally(() => {
        knex.destroy();
    })
    