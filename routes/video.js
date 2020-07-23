var express = require('express');
var router = express.Router();
const video = require('../db/video');
var multer = require('multer');
var upload = multer({dest: 'uploads/'});


router.post('/video', upload.single('img_src'), async(req, res) => {
  try {
    await video.add(req.body, req.file.path);
    res.redirect('/adminhome');
  } catch (e){
    console.log(e);
    res.json({message: e});
  }

});


router.post('/:id/video', async(req, res) => {
  console.log(req.params);
  try {
    await video.deleteOne(req.params);
    res.redirect('/adminhome');
  } catch (e){
    console.log(e);
    res.json({message: 'error deleting particular video'});
  }
});

module.exports = router;
