const express = require('express');
const router = express.Router();
const student = require('../db/student');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});


router.get('/df/df',(req,res)=>{
    res.send('This is the df page')
})


module.exports = router;