const express = require('express');
const router = express.Router();

const banquet = require('../models/banquet');
const caterer = require('../models/caterer');
const photographer = require('../models/photographer');

router.post('/caterer/delete', (req, res) => {
    caterer.updateOne({
        email:req.body.email,
        name:req.body.name
    },
    { 
        $set:{ 
            company:null, 
            tel: null,
            cuisines: null,
            cost: null,
            about: null
        } 
    }).then(() => {
        res.json("deleted");
    })
});

router.post('/banquet/delete', (req, res) => {
    banquet.updateOne({
        email:req.body.email,
        name:req.body.name
    },
    { 
        $set:{ 
            company:null, 
            tel: null,
            capacity: null,
            cost: null,
            about: null
        } 
    }).then(() => {
        res.json("deleted");
    })

});

router.post('/photographer/delete', (req, res) => {
    photographer.updateOne({
        email:req.body.email,
        name:req.body.name
    },
    { 
        $set:{ 
            company:null, 
            tel: null,
            charge: null,
            about: null
        } 
    }).then(() => {
        res.json("deleted");
    })
});


module.exports = router;