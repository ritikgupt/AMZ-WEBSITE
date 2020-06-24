var express = require('express');
var router = express.Router();
const trusted = require('../db/trusted');
var multer = require('multer');
var upload = multer({dest: 'uploads/'});

router.get('/trusted', async(req, res) => {
  res.render('trusted');
});

router.post('/trusted', upload.single('image'), async(req, res) => {
  try {
    await trusted.add(req.file.path);
    res.redirect('/trusted');
  } catch (e){
    console.log(e);
    res.json({message: e});
  }

});

router.get('/edittrusted', async(req, res) => {
  try {
    let a = await trusted.show();
    res.render('edittrusted', {trusted: a});
  } catch (e){
    res.json({message: e});
  }
});

router.post('/delete/trusted', async(req, res) => {
  try {
    await trusted.deleteAll(req);
    res.redirect('/edittrusted');
  } catch (e){
    console.log(e);
    res.json({message: 'error deleting all trusted'});
  }
});

router.post('/:id/edittrusted', async(req, res) => {
  console.log(req.params);
  try {
    await trusted.deleteOne(req.params);
    res.redirect('/edittrusted');
  } catch (e){
    console.log(e);
    res.json({message: 'error deleting particular trusted'});
  }
});

module.exports = router;
