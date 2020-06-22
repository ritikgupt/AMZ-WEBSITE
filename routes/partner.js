var express = require('express');
var router = express.Router();
const partner = require('../db/partner');
var multer = require('multer');
var upload = multer({dest: 'uploads/'});

router.post('/partner',upload.single('image'),async(req,res)=>{
    try{
    let a = await partner.add(req.file.path)
    res.json({message:"partner added "})
    }catch(e){
        console.log(e)
        res.json({message:e})
    }

})

router.post('/delete/partner',async(req,res)=>{
    try{
        let a = await partner.deleteAll(req)
        res.json({message:"deleted all partner"})
    }catch(e){
        console.log(e)
        res.json({message:"error deleting all partner"})
    }
})

router.post('/:url/partner',async(req,res)=>{
    console.log(req.params)
    try{
        let a =await partner.deleteOne(req.params)
        res.json({message:"deleted particular partner"})
    }catch(e){
        console.log(e)
        res.json({message:'error deleting particular partner'})
    }
})

module.exports = router