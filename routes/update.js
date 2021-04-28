const express = require('express');
const router = express.Router();

const banquet = require('../models/banquet');
const caterer = require('../models/caterer');
const photographer = require('../models/photographer');

router.post('/caterer/update', (req, res) => {

    caterer.updateOne({
        email:req.body.email,
        name:req.body.name
    },
    { 
        $set:{ 
            company:req.body.title, 
            tel: req.body.tel,
            cuisines: req.body.type,
            cost: req.body.cost,
            about: req.body.content
        } 
    }).then(() => {
        res.json("updated");
    })
});

router.post('/banquet/update', (req, res) => {
    banquet.updateOne({
        email:req.body.email,
        name:req.body.name
    },
    { 
        $set:{ 
            company:req.body.title, 
            tel: req.body.tel,
            capacity: req.body.type,
            cost: req.body.cost,
            about: req.body.content
        } 
    }).then(() => {
        console.log(res.body);
        res.json("updated");
    })

});

router.post('/photographer/update', (req, res) => {
    photographer.updateOne({
        email:req.body.email,
        name:req.body.name
    },
    { 
        $set:{ 
            company:req.body.title, 
            contact: req.body.tel,
            cost: req.body.cost,
            about: req.body.content
        } 
    }).then(() => {
        res.json("updated");
    })
});


module.exports = router;