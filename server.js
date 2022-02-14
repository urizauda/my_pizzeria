console.log("app is loading");
const express = require("express");
const app = express();
const cors = require("cors")
const utils = require("./utils");
const path = require("path")

const basicRouteProducts = "/products";
const basicRouteCarts = "/cart";
const basicRouteSlider = "/image_slider";
const basicRouteOrders = "/orders";

app.use(cors());
app.use(express.json());

// <<<<---------------- PRODUCTS ----------------->>>>>

// get all products
app.get(`${basicRouteProducts}`, (req, res) => {
    utils.getAllProducts(req, res);
})

// delete specific product by given id----
app.delete(`${basicRouteProducts}/:id`, (req, res) => {
    utils.deleteProductById(req, res);
})

// post new product
app.post(`${basicRouteProducts}`, (req, res) => {
    utils.postNewProduct(req, res);
})

// update a product by given id
app.patch(`${basicRouteProducts}/:id`, (req, res) => {
    utils.updateProductByGivenId(req, res);
})


// <<<<---------------- CARTS ----------------->>>>>

// get cart by given id
app.get(`${basicRouteCarts}/:localId`, (req, res) => {
    utils.getCartById(req, res);
})

// add to cart by given id
app.patch(`${basicRouteCarts}/add/:localId`, (req, res) => {
    utils.addToCart(req, res);
})

// delete from cart by given id
app.patch(`${basicRouteCarts}/delete/:localId`, (req, res) => {
    utils.deleteFromCart(req, res);
})

// post new cart
app.post(`${basicRouteCarts}`, (req, res) => {
    utils.postNewCart(req, res)
})

// post new order
app.post(`${basicRouteOrders}`, (req, res) => {
    utils.addOrder(req, res);
})

//--------------------------------------------------------
// get slider images
app.get(`${basicRouteSlider}`, (req, res) => {
    utils.getSliderImages(req, res);
})



app.use(express.static(path.join(path.join(__dirname, "my_pizzeria" , "build"))));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "my_pizzeria", "build", "build", "index.html"))
})


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
