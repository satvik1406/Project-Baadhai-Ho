const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cart = require('../models/cart').schema;

const newSchema = new Schema({
    cust_name: String,
    cust_email: String,
    cart_items: [{type: cart}],
    total_amount: Number
});

module.exports = mongoose.model('order', newSchema);