var express = require('express');
var router = express.Router();
const advisory = require('../db/advisory');
var multer = require('multer');
var upload = multer({dest: 'uploads/'});

router.get('/showadvisory', async(req, res) => {
  try {
    const a = await advisory.show();
    res.render('showadvisory', {advisory: a});
  } catch (e){
    res.json({message: e});
  }
});

router.get('/advisory', async(req, res) => {
  res.render('advisory');
});
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
