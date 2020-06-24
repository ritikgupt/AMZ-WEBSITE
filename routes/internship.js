var express = require('express');
var router = express.Router();
const internship = require('../db/internship');
var multer = require('multer');
var upload = multer({dest: 'uploads/'});

router.get('/amz/internship', async(req, res) => {
  try {
    let a = await internship.show();
    res.render('internshipcourses');
  } catch (e){
    res.json({message: e});
  }
});

router.get('/internship',async(req,res)=>{
  res.render('addinternship');
});

router.post('/internship', upload.single('image'), async(req, res) => {
  try {
    let a = await internship.add(req.body, req.file.path);
    res.json({message: 'course added'});
  } catch (e) {
    console.log(e);
    res.json({message: e});
  }
});

router.post('/delete/internship', async(req, res) => {
  try {
    let a = await internship.deleteAll();
    res.json({message: 'Deleted all internship'});
  } catch (e) {
    console.log(e);
    res.json({message: e});
  }
});

router.post('/delete/:courseid/internship', async(req, res) => {
  try {
    let a = await internship.deleteOne(req.params);
    res.json({message: 'Deleted the particular internship'});
  } catch (e) {
    console.log(e);
    res.json({message: e});
  }
});

router.post('/edit/:courseid/internship', async(req, res) => {
  try {
    let a = await internship.edit(req.body, req.params);
    res.json({message: 'edited the particular internship'});
  } catch (e) {
    console.log(e);
    res.json({message: e});
  }
});

module.exports = router;
