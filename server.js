let express = require('express');
const path = require('path');
const cors = require('cors');
const passport = require('passport');
const bodyParser = require('body-parser');
const { profile } = require('console');
const mongoose = require('mongoose');
const { Db } = require('mongodb');
const axios=require('axios');
// const MongoClient = require('mongodb').MongoClient;

let app = express();
app.disable("x-powered-by");
// app.use(express.static("basic/public"));
app.use(cors({origin: true, credentials: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "client", "build")))

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

}


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
		res.redirect(category)
        // console.log(category)
        // res.writeHead(302, {
        //     Location: 'http://localhost:5000'+category
        // });
        res.end();
	})
}

call_back('/customer','cust');
call_back('/banquet','banq');
call_back('/caterer','cat');
call_back('/photographer','photog');

// const url = "http://localhost:5000/photographer";
// const usersData= [];


// axios.get(url)
//    .then(res => usersData.push(res.data))
//    .catch(err => console.log("error in sever"+err.data))

// console.log("the data is:"+usersData);
// function confirmation(category){
// 	app.get('/'+ category + '/home',(req,res)=>{
//     	res.send('successful login '+ category)
// 	})
// }

// confirmation('customer');
// confirmation('banquet');
// confirmation('caterer');
// confirmation('photographer');

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"client",'build','index.html'))
})
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});

// "client-install": "npm install --prefix client",
//     "start": "node server.js",
//     "client": "npm start --prefix client",
//     "test": "echo \"Error: no test specified\" && exit 1",
//     "server": "nodemon server.js ",
//     "dev": "concurrently \"cd client && npm run start\" \"npm run server\"",
//     "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix client        && npm run build --prefix client"