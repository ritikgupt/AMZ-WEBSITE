var express = require('express')
var router = express.Router()
const slider = require('../db/image')
const news = require('../db/news')
const partner = require('../db/partner')

router.get('/',async(req,res)=>{
    try{
    let a = await slider.show()
    let b = await news.show()
    let c = await partner.show()
    res.render('home')
    }catch(e){
        res.json({"message":e})
    }
})


module.exports = router;
