const express = require('express');
const router = express.Router();
const student = require('../db/student');
const jwtAuth = require('../middleware/auth');

router.get('/studentportal', jwtAuth, async(req, res) => {
  console.log('he')
  console.log(req.userData);
  const a = await student.show();
  res.render('student-portal', {students: a});
});

module.exports = router;
