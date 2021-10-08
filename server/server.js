const express = require('express');
const bcrypt = require('bcrypt');
const session = require('express-session');
const flash = require('express-flash');
const passport =  require('passport');
const initPass = require('./passport');
const users = require('./user');
const {search} =require('./yelpSearch/yelp')

const port = process.env.PORT || 5500;
let app = express();
//const login = require('./routes/loginRoute');
const register = require('./routes/regRoute');
const userRouter = require('./routes/userRoute');

app.set('view engine','ejs');
app.use(express.urlencoded({extended:false}))
app.use(express.static('public'));
app.use(express.static('public/html'));
app.use(express.json());


initPass(passport,
    email=>users.find(user => user.email===email),
    name=> users.find(user=> user.name === name)
    );

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}))
app.use(flash())
app.use(passport.initialize());
app.use(passport.session());

//Home page
app.get('/',(req,res)=>{
    
        res.sendFile('index.html')
    
});

//Login Routes
app.post('/api',async (req,res)=>{
    const {location,term, sortBy}=req.body;
    let data =await search(term,location,sortBy)
  
    res.send(data)

});



app.route('/login')
.get((req,res)=>res.render('login'))
   .post(passport.authenticate('local',{
       successRedirect:'/user',
       failureRedirect:'/login',
       failureFlash:true
   }));


//Register Routes
app.use('/register',register);


//User Routes
app.use('/user',isLoggedIn,userRouter);


app.get('/logout',(req,res)=>{
    req.logOut();
    res.redirect('/login')
});

function isLoggedIn(req,res,next){
 if(req.method =='GET'){ 
     if(req.isAuthenticated()){
      return next();
  }else{
      res.redirect('/login')
  }}
}

app.listen(port,()=>console.log('Is running on port '+port));