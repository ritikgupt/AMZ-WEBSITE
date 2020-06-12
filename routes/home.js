var express = require('express');
var router = express.Router();
const db = require('../db/db');

router.get('/',async(req,res)=>{
    console.log(req.body.img_url)
    try{
        let a = await db.add_slider(req)
        res.render('home');
    }catch(e){
        res.json({"message":e})
    }
})





module.exports = router;
