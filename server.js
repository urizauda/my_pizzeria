console.log("app is loading");
import dotenv from 'dotenv'
dotenv.config()
// const express = require("express");
import express from "express";
const app = express();
// const cors = require("cors")
import cors from 'cors'
// const utils = require("./utils");
import {
    getAllProducts,
    deleteProductById,
    postNewProduct,
    updateProductByGivenId,
    getCartById,
    deleteFromCart,
    addToCart,
    getSliderImages,
    postNewCart,
    addOrder
} from './utils.js'
// const path = require("path")
import path from 'path'
import { dirname } from 'path';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const basicRouteProducts = "/products";
const basicRouteCarts = "/cart";
const basicRouteSlider = "/image_slider";
const basicRouteOrders = "/orders";

app.use(cors());
app.use(express.json());

// <<<<---------------- PRODUCTS ----------------->>>>>

// get all products
app.get(`${basicRouteProducts}`, (req, res) => {
    getAllProducts(req, res);
})

// delete specific product by given id----
app.delete(`${basicRouteProducts}/:id`, (req, res) => {
    deleteProductById(req, res);
})

// post new product
app.post(`${basicRouteProducts}`, (req, res) => {
    postNewProduct(req, res);
})

// update a product by given id
app.patch(`${basicRouteProducts}/:id`, (req, res) => {
    updateProductByGivenId(req, res);
})


// <<<<---------------- CARTS ----------------->>>>>

// get cart by given id
app.get(`${basicRouteCarts}/:localId`, (req, res) => {
    getCartById(req, res);
})

// add to cart by given id
app.patch(`${basicRouteCarts}/add/:localId`, (req, res) => {
    addToCart(req, res);
})

// delete from cart by given id
app.patch(`${basicRouteCarts}/delete/:localId`, (req, res) => {
    deleteFromCart(req, res);
})

// post new cart
app.post(`${basicRouteCarts}`, (req, res) => {
    postNewCart(req, res)
})

// post new order
app.post(`${basicRouteOrders}`, (req, res) => {
    addOrder(req, res);
})

//--------------------------------------------------------
// get slider images
app.get(`${basicRouteSlider}`, (req, res) => {
    getSliderImages(req, res);
})



// app.use(express.static(path.join(path.join(__dirname, "my_pizzeria" , "build"))));
// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "my_pizzeria", "build", "build", "index.html"))
// })

app.use(express.static(path.join(__dirname, "my_pizzeria", "build")));
app.get("*", (req, resp) => {
  resp.sendFile(path.join(__dirname, "my_pizzeria", "build", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
