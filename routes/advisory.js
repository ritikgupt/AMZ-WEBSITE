const express = require('express');
const router = express.Router();
const advisory = require('../db/advisory');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});


router.post('/advisory', upload.single('image'), async(req, res) => {
  try {
    await advisory.add(req.body, req.file.path);
    res.redirect('/adminhome');
  } catch (e) {
    console.log(e);
    res.json({message: e});
  }
});


router.post('/delete/:id/advisory', async(req, res) => {
  try {
    await advisory.deleteOne(req.params);
    res.redirect('/adminhome');
  } catch (e) {
    console.log(e);
    res.json({message: e});
  }
});

module.exports = router;
