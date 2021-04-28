const express = require('express');
const router = express.Router();

const cart = require('../models/cart');

router.post('/customer/tocart', (req, res) => {
    var item={
        cust_name: req.body.cust_name,
        cust_email: req.body.cust_email,
        type: req.body.type,
        email:req.body.email,
        name: req.body.name,
        company: req.body.company,
        cost:req.body.cost,
        contact: req.body.contact,
        date:req.body.date
    };
    (new cart(item)).save((error) => {
        if (error) {
            res.json("not saved");
        }
        else {
            res.json("item added");
        }
    });
});

module.exports = router;