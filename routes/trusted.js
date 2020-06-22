var express = require('express');
var router = express.Router();
const trusted = require('../db/trusted');
var multer = require('multer');
var upload = multer({dest: 'uploads/'});

router.post('/trusted',upload.single('image'),async(req,res)=>{
    try{
    let a = await trusted.add(req.file.path)
    res.json({message:"trusted added "})
    }catch(e){
        console.log(e)
        res.json({message:e})
    }

})

router.post('/delete/trusted',async(req,res)=>{
    try{
        let a = await trusted.deleteAll(req)
        res.json({message:"deleted all trusted"})
    }catch(e){
        console.log(e)
        res.json({message:"error deleting all trusted"})
    }
})

router.post('/:url/trusted',async(req,res)=>{
    console.log(req.params)
    try{
        let a =await trusted.deleteOne(req.params)
        res.json({message:"deleted particular trusted"})
    }catch(e){
        console.log(e)
        res.json({message:'error deleting particular trusted'})
    }
})

module.exports = router