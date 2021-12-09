const express = require('express');
const session = require('express-session');
const flash = require('express-flash');
const passport =  require('passport');
const initPass = require('./passport');
const {search} =require('./yelpSearch/yelp')
const path= require("path");
const cors = require('cors');
const port = process.env.PORT || 5500;
let app = express();

const register = require('./routes/regRoute'); 
let {users} = require("./user.js");


app.set('view engine','ejs');
app.use(express.urlencoded({extended:false}))
app.use(express.static('public'));
app.use(cors());

app.use(express.json());

async function passPort(){
    let userArr = await users();
 initPass(passport,
    email=> userArr.find(user => user.email===email),
    name=>  userArr.find(user=> user.name === name)
    );
    
}
passPort();
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}))
app.use(flash())
app.use(passport.initialize());
app.use(passport.session());



//Home page
app.get('/',async(req,res)=>{
    
    
    res.render("login");
    
});
/* If the line below is above app.get("/"); index.html will render before login page */
app.use(express.static(path.resolve(__dirname,"../client/build")));

// Yelp api function
app.post('/api',async (req,res)=>{
    const {location,term, sortBy}=req.body;
    let data =await search(term,location,sortBy)
  
    res.send(data)

});


//Login Routes
app.route('/login')
.get(async(req,res)=>{
    //Calls the initialization of the passport Strategy.
    passPort();
   
    
    res.render('login')})
   .post((req,res,next)=>{
    passPort();
    next();
   },passport.authenticate('local',{
       successRedirect:'/index.html',
       failureRedirect:'/login',
       failureFlash:true
   }));


//Register Routes
app.use('/register',register);




//User logout
app.get('/logout',(req,res)=>{
    req.logOut();
    passPort();
    res.redirect('/login')
});



app.listen(port,()=>console.log('Is running on port '+port));