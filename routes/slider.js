var express = require('express');
var router = express.Router();
const slider = require('../db/image');
var multer = require('multer');
var upload = multer({dest: 'uploads/'});

router.get('/slider', async(req, res) => {
  res.render('slider');
});
router.post('/slider', upload.single('img_url'), async(req, res) => {
  console.log(req.file);
  try {
    await slider.add(req.file.path);
    res.redirect('/slider');
  } catch (e){
    console.log(e);
    res.json({message: e});
  }

});

router.get('/editslider', async(req, res) => {
  let a = await slider.show();
  console.log(a);
  res.render('editslider', {sliders: a});
});

router.post('/delete/slider', async(req, res) => {
  try {
    await slider.deleteAll(req);
    res.redirect('/editslider');
  } catch (e){
    console.log(e);
    res.json({message: 'error deleting all slider'});
  }
});

router.post('/:id/editslider', async(req, res) => {
  console.log(req.params);
  try {
    await slider.deleteOne(req.params);
    res.redirect('/editslider');
  } catch (e){
    console.log(e);
    res.json({message: 'error deleting particular slider'});
  }
});

module.exports = router;
