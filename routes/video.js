var express = require('express');
var router = express.Router();
const video = require('../db/video');
var multer = require('multer');
var upload = multer({dest: 'uploads/'});

router.get('/video', async(req, res) => {
  res.render('video');
});

router.post('/video', upload.single('img_src'), async(req, res) => {
  try {
    await video.add(req.body, req.file.path);
    res.redirect('/adminhome');
  } catch (e){
    console.log(e);
    res.json({message: e});
  }

});

router.get('/showvideo', async(req, res) => {
  try {
    const a = await video.show();
    res.render('showVideos', {video: a});
  } catch (e){
    console.log(e);
    res.json({message: e});
  }
});

router.post('/delete/video', async(req, res) => {
  try {
    await video.deleteAll();
    res.redirect('/showvideo');
  } catch (e){
    console.log(e);
    res.json({message: 'error deleting all video'});
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
