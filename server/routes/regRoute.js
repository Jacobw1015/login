const express =require('express');
const router = express.Router();
const users = require('../user');
const bcrypt = require('bcrypt')
const yelpApiKey = '0L3RWCVGHmZPwKgiHMYi6V7eqKaPj_jZ9wFT0Ig7E-eXb8GD-oE6eYnoOW_uzE6hH4ANAY3tq8aOAyuC2nahkKkNClm_QdmFTcvvQAzwJICnLFDqRHYT6OR-zWJqYHYx';
router.route('/')
.get((req,res)=>{
    res.render('register')
})
.post(async (req,res)=>{
    
    let regName=req.body.name;
    let regEmail= req.body.email;
    let currentUser = users.find(user=> user.email==regEmail);
    try{
        const hashedPassword = await bcrypt.hash(req.body.password,10);
       if((regEmail !==""&&regName!=="")&& currentUser ==undefined){
           users.push({
            id: Date.now().toString(),
            name: regName,
            email:regEmail,
            password: hashedPassword
    
        }); res.redirect('/login')
    }else{
        res.redirect('/register')
    }
      
    }catch{
        res.redirect('/register')
    }
    console.log(users)
    })

module.exports =router;