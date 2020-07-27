const express = require('express');
const router = express.Router();
const student = require('../db/student');

router.get('/studentportal', async(req, res) => {
  const a = await student.show();
  res.render('student-portal', {students: a});
});

module.exports = router;
