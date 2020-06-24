var express = require('express');
var router = express.Router();
const video = require('../db/video');

router.get('/video', async(req, res) => {
  res.render('video');
});

router.post('/video', async(req, res) => {
  try {
    let a = await video.add(req.body);
    res.json({message: 'video added ' + req.body.img_url});
  } catch (e){
    console.log(e);
    res.json({message: e});
  }

});

router.post('/delete/video', async(req, res) => {
  try {
    let a = await video.deleteAll(req);
    res.json({message: 'deleted all video'});
  } catch (e){
    console.log(e);
    res.json({message: 'error deleting all video'});
  }
});

router.post('/:url/video', async(req, res) => {
  console.log(req.params);
  try {
    let a = await video.deleteOne(req.params);
    res.json({message: 'deleted particular video'});
  } catch (e){
    console.log(e);
    res.json({message: 'error deleting particular video'});
  }
});

module.exports = router;
