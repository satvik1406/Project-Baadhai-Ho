const express = require('express');
const router = express.Router();

const banquet = require('../models/banquet');
const caterer = require('../models/caterer');
const photographer = require('../models/photographer');
const customer = require('../models/customer');

router.get('/customer/display/order',(req,res)=>{
    customer.find({
        email: req.query.cust_email,
        name: req.query.cust_name
    }).then((data) => {
        ord_his=[]
        for(var i=0;i<data.length;i++){
            ord_his.push(data[i].bookings);
        }
        // console.log("henlo",ord_his);
        res.json(ord_his[0]);
    })
});

router.get('/caterer/display', (req, res) => {
    caterer.find({
        email:req.query.email,
        name:req.query.name
    }
    ).then((data) => {
        all_info=[];
        dis={
            title: data[0].company, 
            tel: data[0].tel, 
            type: data[0].cuisines, 
            cost: data[0].cost,
            content: data[0].about
        }
        your_order={
            bookings: data[0].bookings
        }
        all_info.push(dis);
        all_info.push(your_order);
        res.json(all_info);
    })
});

router.get('/banquet/display', (req, res) => {
    banquet.find({
        email:req.query.email,
        name:req.query.name
    }
    ).then((data) => {
        all_info=[];
        dis={
            title: data[0].company, 
            tel: data[0].tel, 
            type: data[0].capacity, 
            cost: data[0].cost,
            content: data[0].about
        }
        your_order={
            bookings: data[0].bookings
        }
        all_info.push(dis);
        all_info.push(your_order);
        res.json(all_info);
    })
});

router.get('/photographer/display', (req, res) => {
    photographer.find({
        email:req.query.email,
        name:req.query.name
    }
    ).then((data) => {
        all_info=[];
        dis={
            title: data[0].company, 
            tel: data[0].contact, 
            cost: data[0].cost,
            content: data[0].about
        }
        your_order={
            bookings: data[0].bookings
        }
        all_info.push(dis);
        all_info.push(your_order);
        res.json(all_info);
    })
});


module.exports = router;