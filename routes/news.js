var express = require('express');
var router = express.Router();
const news = require('../db/news');

router.post('/news',async(req,res)=>{
    try{
let a = await news.add(req.body)
res.json({message:"news added"})
    }catch(e)
    {
        console.log(e)
        res.json({message:e})
    }
})

router.post('/delete/news', async(req,res)=>{
try{
let a = await news.deleteAll()
res.json({message:"Deleted all news"})
}catch(e)
    {
        console.log(e)
        res.json({message:e})
    }
})
router.post('/delete/:id/news',async(req,res)=>{
    try{
        let a = await news.deleteOne(req.params)
        res.json({message:"Deleted the particular news"})
        }catch(e)
            {
                console.log(e)
                res.json({message:e})
            }
        })
router.post('/edit/:id/news',async(req,res)=>{
    try{
        let a = await news.edit(req.body,req.params)
        res.json({message:"edited the particular news"})
        }catch(e)
            {
                console.log(e)
                res.json({message:e})
            }
        })

module.exports=router
