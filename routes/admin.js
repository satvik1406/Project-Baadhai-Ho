const express = require('express');
const router = express.Router();

const order = require('../models/order');
const customer = require('../models/customer');
const banquet = require('../models/banquet');
const photographer = require('../models/photographer');
const caterer = require('../models/caterer');

router.get('/admin/orders', async(req, res) => {
    var dates_banquet={}
    var dates_caterer={}
    var dates_photographer={}
    var dates_total={}

    var rev_banquet={}
    var rev_caterer={}
    var rev_photographer={}
    var rev_total={}

    var share_banquet=0
    var share_caterer=0
    var share_photographer=0

    var r=[]
    var ans=[]
    var rev=[]
    var shares=[]

    function find_dict1(data){
        for(var i=0;i<data.length;i++){
            var dates=data[i]['booked_on'];
            share_banquet=share_banquet+dates.length
            for(var j=0;j<dates.length;j++){
                if(dates[j] in dates_banquet){
                    dates_banquet[dates[j]]++
                    rev_banquet[dates[j]]=rev_banquet[dates[j]]+data[i]['cost']
                }
                else{
                    dates_banquet[dates[j]]=1
                    rev_banquet[dates[j]]=data[i]['cost']
                }
                
                if(dates[j] in dates_total){
                    dates_total[dates[j]]++
                    rev_total[dates[j]]=rev_total[dates[j]]+data[i]['cost']
                }
                else{
                    dates_total[dates[j]]=1
                    rev_total[dates[j]]=data[i]['cost']
                }
            }
        }
        // console.log("banquet",share_banquet);
        ans.push(dates_banquet);
        rev.push(rev_banquet);
        shares.push(share_banquet)
    }

    function find_dict2(data){
        for(var i=0;i<data.length;i++){
            var dates=data[i].booked_on
            share_caterer=share_caterer+dates.length
            for(var j=0;j<dates.length;j++){
                if(dates[j] in dates_caterer){
                    dates_caterer[dates[j]]++
                    rev_caterer[dates[j]]=rev_caterer[dates[j]]+data[i]['cost']
                }
                else{
                    dates_caterer[dates[j]]=1
                    rev_caterer[dates[j]]=data[i]['cost']
                }

                if(dates[j] in dates_total){
                    dates_total[dates[j]]++
                    rev_total[dates[j]]=rev_total[dates[j]]+data[i]['cost']
                }
                else{
                    dates_total[dates[j]]=1
                    rev_total[dates[j]]=data[i]['cost']
                }
            }
        }
        // console.log("caterer",share_caterer);
        ans.push(dates_caterer);
        rev.push(rev_caterer);
        shares.push(share_caterer);
    }

    function find_dict3(data){
        for(var i=0;i<data.length;i++){
            var dates=data[i].booked_on
            share_photographer=share_photographer+dates.length
            for(var j=0;j<dates.length;j++){
                if(dates[j] in dates_photographer){
                    dates_photographer[dates[j]]++
                    rev_photographer[dates[j]]=rev_photographer[dates[j]]+data[i]['cost']
                }
                else{
                    dates_photographer[dates[j]]=1
                    rev_photographer[dates[j]]=data[i]['cost']
                }

                if(dates[j] in dates_total){
                    dates_total[dates[j]]++
                    rev_total[dates[j]]=rev_total[dates[j]]+data[i]['cost']
                }
                else{
                    dates_total[dates[j]]=1
                    rev_total[dates[j]]=data[i]['cost']
                }
            }
        }
        // console.log("photographer",share_photographer);
        // console.log("total",rev_total);

        shares.push(share_photographer);

        ans.push(dates_photographer);
        ans.push(dates_total);

        rev.push(rev_photographer);
        rev.push(rev_total);

        r.push(ans);
        r.push(rev);
        r.push(shares);
    }

    await banquet.find().then(async (data) => {
        await find_dict1(data)
    });

    await caterer.find().then(async (data) => {
        await find_dict2(data)
    });
    

    await photographer.find().then(async (data) => {
        await find_dict3(data)
    });
    
    res.json(r);
});

// router.get('/admin/revenue', (req, res) => {
//     revenue_banquet
//     revenue_caterer
//     revenue_photographer
//     revenue_total

//     .find({
//     }).then((data) => {
//         res.json(data)
//     })
// });

module.exports = router;