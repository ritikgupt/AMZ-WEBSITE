const express = require('express');
const router = express.Router();
const student = require('../db/student');
const admin_auth = require('../middleware/admin_auth');

router.get('/admin/irc',admin_auth,async(req,res)=>{
    try{
    const a = await student.requestShow()
    console.log(a)
    res.render('irc',{requests:a})
    }catch(e){
        throw e;
    }
})

module.exports = router;