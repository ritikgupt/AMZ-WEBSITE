var express = require('express');
var router = express.Router();
const slider = require('../db/image');

router.get('/',async(req,res)=>{
    let a = await slider.show()
    try{
        console.log(a)
        res.render('home');
    }catch(e){
        res.json({"message":e})
    }
})


module.exports = router;
