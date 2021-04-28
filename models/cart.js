const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newSchema = new Schema({
    cust_name: String,
    cust_email: String,
    type: String,
    email:String,
    name: String,
    company: String,
    cost:Number,
    contact: Number,
    date: String
});

module.exports = mongoose.model('cart', newSchema);
