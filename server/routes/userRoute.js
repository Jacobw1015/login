const express =require('express');
const path=require('path');
const router = express.Router();

router.use(express.static(path.resolve(__dirname,"../../client/build")));
router.route('/').get((req,res)=>{
   let name = req.user.name;
   let prop= name[0].toUpperCase().concat(name.slice(1));
    res.sendFile('/index.html')
});



module.exports =router;