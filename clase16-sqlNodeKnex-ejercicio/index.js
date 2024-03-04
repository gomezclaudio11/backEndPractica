const knex = require ("knex") ({
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      port : 3306,
      user: 'root',
      password: '',
      database: 'ecommerce'
    },
  });

  async function ejecutarTareas() {
    try {
       // Borrar la tabla si ya existe
       await knex.schema.dropTableIfExists("articulos");
       
       // Crear la tabla articulos
       await knex.schema.createTable("articulos", (table) => {
        table.increments("id").primary();
        table.string("nombre").notNullable();
        table.string("codigo").notNullable();
        table.float("precio");
        table.integer("stock");
    });

    // Insertar 5 artículos
    await knex('articulos').insert([
        { nombre: 'Articulo1', codigo: 'ABC123', precio: 10.99, stock: 50 },
        { nombre: 'Articulo2', codigo: 'XYZ789', precio: 20.49, stock: 30 },
        { nombre: 'Articulo3', codigo: 'DEF456', precio: 15.75, stock: 25 },
        { nombre: 'Articulo4', codigo: 'GHI789', precio: 8.99, stock: 40 },
        { nombre: 'Articulo5', codigo: 'JKL012', precio: 12.50, stock: 60 }
      ]);

      //Listar la tabla
      const resultados = await knex("articulos")
      console.log("articulos de la tabla");
      console.log(resultados);

       // Borrar el artículo con id = 3
       await knex("articulos").where({ id: 3 }).del();

       //actualizar stock
       await knex("articulos").where({ id: 2 }).update({ stock: 0 });

       console.log("operaciones realizadas con exito");
    } catch (error) {
        console.error('Error:', error);
      } finally {
        // Cerrar la conexión de Knex
        await knex.destroy();
      }
  }

  // Ejecutar las tareas
ejecutarTareas();