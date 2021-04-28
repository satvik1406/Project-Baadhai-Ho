let express = require('express');
let app = express();

const path = require('path');
const cors = require('cors');
const passport = require('passport');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const red_url = require('url');

app.disable("x-powered-by");
app.use(express.static("basic/public"));
app.use(cors({origin: true, credentials: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.json())
app.use(express.static(path.join(__dirname, "client", "build")))
app.use(passport.initialize());
app.use(passport.session());

require("./passport");

const banquet = require('./models/banquet');
const caterer = require('./models/caterer');
const photographer = require('./models/photographer');
const customer = require('./models/customer');

const display_all=require('./routes/display_all');
const update=require('./routes/update');
const del=require('./routes/delete');
const display=require('./routes/display');
const tocart=require('./routes/tocart');
const send_cart=require('./routes/send_cart');
const book=require('./routes/book');
const remove_item=require('./routes/remove_item');
const admin=require('./routes/admin');

app.use('/', update);
app.use('/',del);
app.use('/',display);
app.use('/',display_all);
app.use('/',tocart);
app.use('/',send_cart);
app.use('/',book);
app.use('/',remove_item);
app.use('/',admin);

const PORT = process.env.PORT || 5000;
const url = "mongodb+srv://karthik:hello123@data.cyqgb.mongodb.net/db?retryWrites=true&w=majority";

const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
}

mongoose.connect(url,connectionParams);  
mongoose.connection.on('connected', () => {
    console.log('connected to Mongoose');
});

rec_login=(email_id,name,cat)=>{
    var mod
    if (cat=='customer'){mod=customer}
    if (cat=='caterer'){mod=caterer}
    if (cat=='photographer'){mod=photographer}
    if (cat=='banquet'){mod=banquet}

    mod.findOne({email: email_id}, function(err, data) {
        if(data==null){
            if (cat=='customer'){
                user={
                    email: email_id,
                    name: name,
                    bookings:[]
                };
                (new customer(user)).save()
            }
            if (cat=='caterer'){
                user={
                    email: email_id,
                    name: name,
                    company: null, 
                    tel: null, 
                    cuisines: null, 
                    cost: null,
                    about: null,
                    booked_on: [],
                    bookings:[]
                };
                (new caterer(user)).save()
            }
            if (cat=='photographer'){
                user={
                    email: email_id,
                    name: name,
                    company: null, 
                    tel: null, 
                    cost: null, 
                    about: null,
                    booked_on: [],
                    bookings:[]
                };
                (new photographer(user)).save()
            }
        
            if (cat=='banquet'){
                user={
                    email: email_id,
                    name: name,
                    company: null, 
                    tel: null, 
                    capacity: null, 
                    cost: null,
                    about: null,
                    booked_on: [] ,
                    bookings:[]         
                };
                (new banquet(user)).save()
            }   
        }
      }
    );
}

function call_back(category,type){
	app.get(category+'/google',passport.authenticate(type, {scope:['profile','email']}))
	app.get(category+'/google/callback',
		passport.authenticate(type,{failureRedirect: '/failed'}),(req,res)=>{
        let data=req.user
        let user_name=data.displayName
        let email_id=data.emails[0].value
        cat=category.substring(1);
        
        if(cat=='admin'){
            if(email_id=='f20170927@hyderabad.bits-pilani.ac.in' || email_id=='f20171449@hyderabad.bits-pilani.ac.in' || email_id=='f20171083@hyderabad.bits-pilani.ac.in' || email_id=='f20171011@hyderabad.bits-pilani.ac.in'){
                res.redirect(category);
            }
            else{
                res.send('<html><body><h1>YOU ARE NOT AUTHORIZED!!!</h1></body></html>');
            }
        }
        else{
            rec_login(email_id,user_name, cat)

            res.redirect(red_url.format({
                pathname:category,
                query: {
                "email": email_id,
                "username": user_name
                }
                }));
        }

	})
}

call_back('/customer','cust');
call_back('/banquet','banq');
call_back('/caterer','cat');
call_back('/photographer','photog');
call_back('/admin','admin');

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"client",'build','index.html'))
})

app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});
