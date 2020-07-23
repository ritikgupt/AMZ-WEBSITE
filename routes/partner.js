var express = require('express');
var router = express.Router();
const partner = require('../db/partner');
var multer = require('multer');
var upload = multer({dest: 'uploads/'});


router.post('/partner', upload.single('image'), async(req, res) => {
  try {
    await partner.add(req.file.path);
    res.redirect('/adminhome');
  } catch (e){
    console.log(e);
    res.json({message: e});
  }

});


router.post('/:id/editpartner', async(req, res) => {
  try {
    await partner.deleteOne(req.params);
    res.redirect('/adminhome');
  } catch (e){
    console.log(e);
    res.json({message: 'error deleting particular partner'});
  }
});

module.exports = router;
