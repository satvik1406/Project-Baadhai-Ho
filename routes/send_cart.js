const express = require('express');
const router = express.Router();

const cart = require('../models/cart');

router.get('/customer/cart_items', (req, res) => {
    cart.find({
        cust_email: req.query.cust_email,
        cust_name: req.query.cust_name
    }).then((data) => {
        res.json(data)
    })
});

module.exports = router;