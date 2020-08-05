const express = require('express');
const router = express.Router();
const student = require('../db/student');
const jwtAuth = require('../middleware/auth');
var multer = require('multer');
var upload = multer({dest: 'uploads/'});

router.get('/studentportal', jwtAuth, async(req, res) => {
  console.log(req.userData);
  const a = await student.showOne(req.userData.enroll_id);
  res.render('student-portal', {student: a});
});

router.post('/student/request', upload.single('img_url'), jwtAuth, async(req, res) => {
  try {
    const type = req.body.type;
    const heading = req.body.heading;
    const description = req.body.description;
    const userid = req.userData.enroll_id;
    const filepath = req.file.path;
    await student.request(type, heading, description, userid, filepath);
    res.redirect('/studentportal');
  } catch (e){
    throw e;
  }
});
module.exports = router;

router.post('/student/project', upload.single('img_url'), jwtAuth, async(req, res) => {
  try {
    const heading = req.body.heading;
    const description = req.body.description;
    const filepath = req.file.path;
    console.log(filepath);
    const userid = req.userData.enroll_id;
    await student.project(heading, description, filepath, userid);
    res.redirect('/studentportal');
  } catch (e){
    throw e;
  }
});
