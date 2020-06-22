var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest: 'uploads/'});
const advisory = require('../db/advisory');

router.post('/advisory',upload.single('image'),async(req,res)=>{
    console.log(req.body)
    try{
let a = await advisory.add(req.body,req.file.path)
res.json({message:"advisory added"})
    }catch(e)
    {
        console.log(e)
        res.json({message:e})
    }
})

router.post('/delete/advisory', async(req,res)=>{
try{
let a = await advisory.deleteAll()
res.json({message:"Deleted all advisory"})
}catch(e)
    {
        console.log(e)
        res.json({message:e})
    }
})
router.post('/delete/:id/advisory',async(req,res)=>{
    try{
        let a = await advisory.deleteOne(req.params)
        res.json({message:"Deleted the particular advisory"})
        }catch(e)
            {
                console.log(e)
                res.json({message:e})
            }
        })
router.post('/edit/:id/advisory',async(req,res)=>{
    try{
        let a = await advisory.edit(req.body,req.params,req.file.path)
        res.json({message:"edited the particular advisory"})
        }catch(e)
            {
                console.log(e)
                res.json({message:e})
            }
        })

module.exports=router
