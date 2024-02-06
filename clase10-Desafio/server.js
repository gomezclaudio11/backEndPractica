const express = require ("express")
const app = express();

app.use(express.urlencoded({extended: true}))

app.use(express.json());

app.set("view engine", "ejs");

const ProductContenedor = require ("./src/contenerdor")
const productContenedor = new ProductContenedor();

app.get("/", (req, res) => {
    const producList = [];
    res.render("pages/index", {list: producList})
})

app.get ("/products", (req, res) => {
    const productList = productContenedor.getAll()
    res.render("pages/products", {productos: productList})
})

app.post ("/products", (req, res) => {
    productContenedor.save(req.body)
    res.redirect("/products")
})

const PORT = 8080
app.listen (PORT, ()=> {
    console.log(`escuchando en puerto ${PORT}`)
})
app.on ("error", error => console.log(`error en ${error}`))