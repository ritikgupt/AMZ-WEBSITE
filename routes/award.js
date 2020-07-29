const express=require('express')
const router=express.Router();
const award = require('../db/award');
var multer = require('multer');
var upload = multer({dest: 'uploads/'});
const admin_auth = require('../middleware/admin_auth');


router.get('/award/gallery',async(req,res)=>{
    try{
    const a = await award.show()
    res.render('award',{award:a})
    }catch(e){
        console.log(e)
        res.json({message:error})
    }
})

router.post('/award',upload.single('img_url'),admin_auth,async(req,res)=>{
    console.log(req.file.path)
    try {
        await award.add(req.file.path);
        res.redirect('/adminhome');
      } catch (e){
        console.log(e);
        res.json({message: e});
      }
})

router.post('/:id/award', admin_auth,async(req, res) => {
    try {
      await award.deleteOne(req.params);
      res.redirect('/adminhome');
    } catch (e){
      console.log(e);
      res.json({message: 'error deleting particular award image'});
    }
  });

module.exports=router;