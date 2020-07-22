var express = require('express');
var router = express.Router();
const partner = require('../db/partner');
var multer = require('multer');
var upload = multer({dest: 'uploads/'});

router.get('/partner', async(req, res) => {
  res.render('partner');
});

router.post('/partner', upload.single('image'), async(req, res) => {
  try {
    await partner.add(req.file.path);
    res.redirect('/adminhome');
  } catch (e){
    console.log(e);
    res.json({message: e});
  }

});

router.get('/editpartner', async(req, res) => {
  try {
    let a = await partner.show();
    res.render('editpartner', {partner: a});
  } catch (e) {
    res.json({message: e});
  }

});

router.post('/delete/partner', async(req, res) => {
  try {
    await partner.deleteAll(req);
    res.redirect('/editpartner');
  } catch (e){
    console.log(e);
    res.json({message: 'error deleting all partner'});
  }
});

router.post('/:id/editpartner', async(req, res) => {
  console.log('f');
  console.log(req.params);
  try {
    await partner.deleteOne(req.params);
    res.redirect('/adminhome');
  } catch (e){
    console.log(e);
    res.json({message: 'error deleting particular partner'});
  }
});

module.exports = router;
