var express = require('express')
var router = express.Router()
const slider = require('../db/image')
const news = require('../db/news')

router.get('/',async(req,res)=>{
    let a = await slider.show('home_slider')
    let b = await news.show('news')
    try{
        console.log(b)
        console.log(a)
        res.render('home');
    }catch(e){
        res.json({"message":e})
    }
})


module.exports = router;
