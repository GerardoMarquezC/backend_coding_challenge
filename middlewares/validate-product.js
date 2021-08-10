const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const validateArrayProduct = async (products) => {
    products.forEach(p => {
        if (!p.name) {
            throw new Error(`name is required`);
        }
        if (!p.quantity) {
            throw new Error(`quantity is required`);
        }
        if (!p.price) {
            throw new Error(`price is required`);
        }

    });
};

const validateTotalPricefromProducts = async (products,{req}) => {
    const total = products.reduce((a, b) => (b.price * b.quantity) + a, 0);
    if(req.body.total_price != total){
        throw new Error(`the sum of the price of the products multiplied by the quantity must equal the total price`);
    }
};

module.exports = { validateArrayProduct,validateTotalPricefromProducts };