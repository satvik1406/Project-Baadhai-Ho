const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cart = require('../models/cart').schema;

const newSchema = new Schema({
    email: String,
    name: String,
    bookings: []
});

module.exports = mongoose.model('customer', newSchema);