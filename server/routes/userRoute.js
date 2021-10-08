const express =require('express');
const router = express.Router();

router.route('/').get((req,res)=>{
   let name = req.user.name;
   let prop= name[0].toUpperCase().concat(name.slice(1));
    res.render('user',{user: prop})
});



module.exports =router;