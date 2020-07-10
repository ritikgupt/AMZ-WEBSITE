var express = require('express');
var router = express.Router();
const video = require('../db/video');

router.get('/video', async(req, res) => {
  res.render('video');
});

router.post('/video', async(req, res) => {
  try {
    await video.add(req.body);
    res.render('video');
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
    let a = await video.deleteAll();
    res.redirect('/showvideo');
  } catch (e){
    console.log(e);
    res.json({message: 'error deleting all video'});
  }
});


router.post('/:id/showvideo', async(req, res) => {
  console.log(req.params);
  try {
    await video.deleteOne(req.params);
    res.json({message: 'deleted particular video'});
  } catch (e){
    console.log(e);
    res.json({message: 'error deleting particular video'});
  }
});

module.exports = router;
