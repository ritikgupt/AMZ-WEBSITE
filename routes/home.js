var express = require('express')
var router = express.Router()
const slider = require('../db/image')
const news = require('../db/news')
const partner = require('../db/partner')
const trusted = require('../db/trusted')
const advisory = require('../db/advisory')

router.get('/',async(req,res)=>{
    try{
    let a = await slider.show()
    let b = await news.show()
    let c = await partner.show()
    let d = await trusted.show()
    let e = await advisory.show()
    res.json(e)
    }catch(e){
        res.json({"message":e})
    }
})


module.exports = router;
