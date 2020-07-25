const express = require('express');
const router = express.Router();
const student = require('../db/student');
const certificate = require('../db/certificate');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '.csv');
  },
});
const upload = multer({storage: storage});

const CSVToJSON = require('csvtojson');

router.post('/student/upload', upload.single('csv'), async(req, res) => {
  console.log(req.file);
  const source = await CSVToJSON().fromFile(req.file.path);
  for (var i = 0; i < source.length; i++) {
    const name = source[i].Name;
    const institute = source[i].institute;
    const enroll_id = source[i].enroll_id;
    const branch = source[i].branch;
    const mobile = source[i].mobile;
    const email = source[i].email;
    const password = source[i].password;
    const img_url = 'abc';
    await student.add(enroll_id, name, institute, branch, mobile, email, password, img_url);
  }
  res.send('Student Details Added');
});

router.post('/student/certificate', upload.single('csv'), async(req, res) => {
  const source = await CSVToJSON().fromFile(req.file.path);
  for (var i = 0; i < source.length; i++) {
    const name = source[i].Name;
    const institute = source[i].institute;
    const enroll_id = source[i].enroll_id;
    await certificate.add(enroll_id, name, institute);
  }
  res.send('Student Details for certificate Added');
});

router.post('/student/verify', async(req, res) => {
  console.log('heelo');
  try {
    const serial = req.body.serial;
    console.log(serial);
    const a = await certificate.verify(serial);
    if (a.length == '1')
      res.json(a);
    else
      res.json('Not Enrolled with any program');
  } catch (e){
    throw e;
  }
});

// router.post('/g/g',async(req,res)=>{
//   res.send('fggf')
// })

module.exports = router;
