const express = require('express');
const router = express.Router();
const student = require('../db/student');
const jwtAuth = require('../middleware/auth');

router.get('/studentportal', jwtAuth, async(req, res) => {
  console.log(req.userData);
  const a = await student.showOne(req.userData.enroll_id);
  console.log(a)
  res.render('student-portal', {student:a});
});

module.exports = router;
