const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cart = require('../models/cart').schema;

const newSchema = new Schema({
    email: String,
    name: String,
    company: String, 
    tel: Number, 
    cuisines: String, 
    cost: Number,
    about: String,
    booked_on:  [{type: String}],
    bookings: [{type: cart}]

});

module.exports = mongoose.model('caterer', newSchema);