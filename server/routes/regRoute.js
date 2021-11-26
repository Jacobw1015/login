const express =require('express');
const router = express.Router();
const users = require('../user');
const bcrypt = require('bcrypt')
const { writeUser } = require('../googleSheets/accessGoogleSheets');
const {getEmails,getNames,getPass} = require("../googleSheets/uploadUserData");

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
       if((regEmail !==""&&regName!=="")&& currentUser ==undefined &&(regEmail !==currentUser)){
           users.push({
            id: Date.now().toString(),
            name: regName,
            email:regEmail,
            password: hashedPassword
    
        }); 
        let newUser = users[users.length-1];
       await writeUser([newUser.name,newUser.email,newUser.password])
        res.redirect('/login')
    }else{
        res.redirect('/register')
    }
      
    }catch{
        res.redirect('/register')
    }
    
    })

module.exports =router;