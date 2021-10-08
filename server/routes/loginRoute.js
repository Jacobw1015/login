const express =require('express');
const router = express.Router();


router.route('/')
.get((req,res,next)=>{
    res.render('login') 
   })
   .post((req,res,next)=>{
       
            res.render('user',{user:req.body.email});
       

   });


   module.exports= router;