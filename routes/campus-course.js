var express = require('express');
var router = express.Router();
const campus = require('../db/campus-course');
var multer = require('multer');
var upload = multer({dest: 'uploads/'});

router.get('/amz/campus', async(req, res) => {
  try {
    let a = await campus.show();
    res.render('campusCourse');
  } catch (e){
    res.json({message: e});
  }
});
router.get('/campus', async(req, res) => {
  res.render('addcampuscourses');
});

router.post('/campus', upload.single('image'), async(req, res) => {
  try {
    let a = await campus.add(req.body, req.file.path);
    res.json({message: 'course added'});
  } catch (e) {
    console.log(e);
    res.json({message: e});
  }
});

router.post('/delete/campus', async(req, res) => {
  try {
    let a = await campus.deleteAll();
    res.json({message: 'Deleted all campus'});
  } catch (e) {
    console.log(e);
    res.json({message: e});
  }
});

router.post('/delete/:courseid/campus', async(req, res) => {
  try {
    let a = await campus.deleteOne(req.params);
    res.json({message: 'Deleted the particular campus'});
  } catch (e) {
    console.log(e);
    res.json({message: e});
  }
});

router.post('/edit/:courseid/campus', async(req, res) => {
  try {
    let a = await campus.edit(req.body, req.params);
    res.json({message: 'edited the particular campus'});
  } catch (e) {
    console.log(e);
    res.json({message: e});
  }
});

module.exports = router;
