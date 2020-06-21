var express = require('express');
var router = express.Router();
const courses = require('../db/courses');

router.get('/amz/courses',async(req,res)=>{
    try{
        let a = await courses.show()
        res.json(a)
    }catch(e){
        res.json({message:e})
    }
})
router.post('/courses',async(req,res)=>{
    try{
let a = await courses.add(req.body)
res.json({message:"course added"})
    }catch(e)
    {
        console.log(e)
        res.json({message:e})
    }
})

router.post('/delete/courses', async(req,res)=>{
try{
let a = await courses.deleteAll()
res.json({message:"Deleted all courses"})
}catch(e)
    {
        console.log(e)
        res.json({message:e})
    }
})
router.post('/delete/:courseid/courses',async(req,res)=>{
    try{
        let a = await courses.deleteOne(req.params)
        res.json({message:"Deleted the particular courses"})
        }catch(e)
            {
                console.log(e)
                res.json({message:e})
            }
        })
router.post('/edit/:courseid/courses',async(req,res)=>{
    try{
        let a = await courses.edit(req.body,req.params)
        res.json({message:"edited the particular courses"})
        }catch(e)
            {
                console.log(e)
                res.json({message:e})
            }
        })

module.exports=router
