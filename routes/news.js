var express = require('express');
var router = express.Router();
const news = require('../db/news');
var multer = require('multer');
var upload = multer({dest: 'uploads/'});


router.post('/news', upload.single('image'), async(req, res) => {
  try {
    await news.add(req.body, req.file.path);
    res.redirect('/adminhome');
  } catch (e) {
    console.log(e);
    res.json({message: e});
  }
});


router.post('/delete/:id/news', async(req, res) => {
  try {
    await news.deleteOne(req.params);
    res.redirect('/adminhome');
  } catch (e) {
    console.log(e);
    res.json({message: e});
  }
});

module.exports = router;
