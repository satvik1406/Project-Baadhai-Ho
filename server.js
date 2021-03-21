let express = require('express');
const path = require('path');
const cors = require('cors');
const passport = require('passport');
const bodyParser = require('body-parser');
const { profile } = require('console');
const mongoose = require('mongoose');
const { Db } = require('mongodb');
// const MongoClient = require('mongodb').MongoClient;

let app = express();
app.disable("x-powered-by");
app.use(express.static("basic/public"));
//app.use(cors({origin: true, credentials: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


function rec_login(user, collec_name){
    const url = "mongodb+srv://karthik:hello123@data.cyqgb.mongodb.net/db?retryWrites=true&w=majority";
    const connectionParams={
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true 
    }
    mongoose.connect(url,connectionParams)
        .then( () => {
            var db=mongoose.connection.db
            mail=user.email
            db.collection(collec_name).findOne({email:user.email},function(err,data){
                if(err){
                    console.log(err)
                }
                if(data==null){
                    console.log("not found, inserting")
                    db.collection(collec_name).insertOne(user)
                }
            })
            
        })
        .catch( (err) => {
            console.error(`Error connecting to the database. \n${err}`);
        })
        // .finally(()=>{
        //     mongoose.connection.close()
        // })
    // mongoose.connection.close()
}
// async function listDatabases(client){
//     databasesList = await client.db().admin().listDatabases();
 
//     console.log("Databases:");
//     databasesList.databases.forEach(db => console.log(` - ${db.name}`));
// };
 
// const uri = "mongodb+srv://karthik:hello123@data.cyqgb.mongodb.net/db?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// async function main(client){
//     try {
//         await  client.connect();
//         console.log("in main");
//         await  listDatabases(client);
//     } catch (e) {
//         console.log("error in catch")
//         console.error(e);
//     } 
//     finally{
//         console.log("closing.......")
//         client.close()
//     }
// }
// main(client).catch(console.error);

app.use(passport.initialize());
app.use(passport.session());
require("./passport.js");

function call_back(category,type){
	app.get(category+'/google',passport.authenticate(type, {scope:['profile','email']}))
	app.get(category+'/google/callback',
		passport.authenticate(type,{failureRedirect: '/failed'}),(req,res)=>{
        data=req.user
        user_name=data.displayName
        email_id=data.emails[0].value
        cat=category.substring(1);
        var user={
            email:email_id,
            name:user_name
        }

            rec_login(user, cat)
		res.redirect(category+'/home')
	})
}

call_back('/customer','cust');
call_back('/banquet','banq');
call_back('/caterer','cat');
call_back('/photographer','photog');

// app.get('/customer/google',passport.authenticate('cust', {scope:['profile','email']}))
// app.get('/customer/google/callback',
//     passport.authenticate('cust',{failureRedirect: '/failed'}),(req,res)=>{
//     console.log(req.user)
//     res.redirect('/customer/home')
// })


// app.get('/banquet/google', passport.authenticate('banq', {scope:['profile','email']}))
// app.get('/banquet/google/callback',
//     passport.authenticate('banq',{failureRedirect: '/failed'}),(req,res)=>{
//     console.log(req.user)
//     res.redirect('/banquet/home')
// })

// app.get('/caterer/google', passport.authenticate('cat', {scope:['profile','email']}))
// app.get('/caterer/google/callback',
//     passport.authenticate('cat',{failureRedirect: '/failed'}),(req,res)=>{
//     console.log(req.user)
//     res.redirect('/caterer/home')
// })

// app.get('/photographer/google', passport.authenticate('photog', {scope:['profile','email']}))
// app.get('/photographer/google/callback',
//     passport.authenticate('photog',{failureRedirect: '/failed'}),(req,res)=>{
//     console.log(req.user)
//     res.redirect('/photographer/home')
// })


// app.get("/customer/home",(req,res)=>{
//     res.send('successful login customer')
// })

function confirmation(category){
	app.get('/'+ category + '/home',(req,res)=>{
    	res.send('successful login '+ category)
	})
}

confirmation('customer');
confirmation('banquet');
confirmation('caterer');
confirmation('photographer');

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"basic/public",'index.html'))
})
app.listen(5000, ()=>{
    console.log('The server listenining on port 5000')
})
