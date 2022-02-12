console.log("app is loading");
const express = require("express");
const app = express();
const utils = require("./utils");
const basicRouteProducts = "/products";
const basicRouteCarts = "/cart";
const basicRouteSlider = "/image_slider";
const basicRouteOrders = "/orders";

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






const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
