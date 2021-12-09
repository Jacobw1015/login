const express =require('express');
const router = express.Router();
const {users} = require('../user');
const bcrypt = require('bcrypt')
const { writeUser } = require('../googleSheets/accessGoogleSheets');
const {getId} = require("../googleSheets/uploadUserData");


router.route('/')
.get((req,res)=>{
    res.render('register')
})
.post(async (req,res)=>{
    
    let userArr = await users();
    let ids= await getId();
        ids=(ids.length)+1;

    let regName=req.body.name;
    let regEmail= req.body.email;
    let currentUser = userArr.find(user=> user.email==regEmail);
    try{
       
        const hashedPassword = await bcrypt.hash(req.body.password,10);
       if((regEmail !==""&&regName!=="")&& currentUser ==undefined &&(regEmail !==currentUser)){
        userArr.push({
            id: ids,
            name: regName,
            email:regEmail,
            password: hashedPassword
    
        }); 
        let newUser = userArr[userArr.length-1];
        
       await writeUser([newUser.id,newUser.name,newUser.email,newUser.password])
        res.redirect('/login')
    }else{
        res.redirect('/register')
    }
      
    }catch{
        res.redirect('/register')
    }
    
    })

module.exports =router;