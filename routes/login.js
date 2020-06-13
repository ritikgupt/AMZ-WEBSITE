var express = require('express');
var router = express.Router();

router.get('/login',async(req,res)=>{
    try{
        res.render('amz_login')
    }catch(e){
        console.log(e)
        res.json({message:e})
    }
})

module.exports = router;