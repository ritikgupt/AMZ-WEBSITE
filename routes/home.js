var express = require('express');
var router = express.Router();

router.get('/',async(req,res)=>{
    try{
        res.render('home');
    }catch{
        res.json({"message":error})
    }
})






module.exports = router;
