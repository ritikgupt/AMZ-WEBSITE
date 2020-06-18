const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const auth =require('../db/authentication')

router.post('/register',async(req,res)=>{
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            auth.add(req.body,hash)
        });
    });
    res.json({message:"user added"})
})

router.get('/login',async(req,res)=>{
    try{
        res.render('amz_login')
    }catch(e){
        console.log(e)
        res.json({message:e})
    }
})

router.post('/login',async(req,res)=>{

})

module.exports = router;