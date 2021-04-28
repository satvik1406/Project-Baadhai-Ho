const express = require('express');
const router = express.Router();

const order = require('../models/order');
const cart = require('../models/cart');
const banquet = require('../models/banquet');
const caterer = require('../models/caterer');
const customer = require('../models/customer');
const photographer = require('../models/photographer');

router.post('/book', (req, res) => {
    
    var info={
        cust_name: req.body.cust_name,
        cust_email: req.body.cust_email,
        cart_items: req.body.cart_items,
        total_amount: req.body.total_amount
    };

    (new order(info)).save().then(()=>{});

    cart.deleteMany(
        {cust_email: req.body.cust_email}
    ).then(()=>{});

    customer.updateOne({
        name: req.body.cust_name,
        email: req.body.cust_email
    },
    {
        $push:{
            bookings : [req.body.cart_items]
        }
    }).then(() => {});

    var items=req.body.cart_items;

    for (var i = 0; i < items.length; i++) {
        if(items[i].type=='banquet'){
            banquet.updateOne({
                email:items[i].email,
                name:items[i].name
            },
            { 
                $push:{ 
                    booked_on : [items[i].date],
                    bookings : [items[i]]
                } 
            }).then(() => {})
        }

        if(items[i].type=='caterer'){
            caterer.updateOne({
                email:items[i].email,
                name:items[i].name
            },
            { 
                $push:{ 
                    booked_on : [items[i].date],
                    bookings : [items[i]]
                } 
            }).then(() => {})
        }

        if(items[i].type=='photographer'){
            photographer.updateOne({
                email:items[i].email,
                name:items[i].name
            },
            { 
                $push:{ 
                    booked_on : [items[i].date],
                    bookings : [items[i]]
                } 
            }).then(() => {})
        }
    }
});

module.exports = router;