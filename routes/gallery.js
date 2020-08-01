const express = require('express');
const router = express.Router();
const gallery = require('../db/gallery');
var multer = require('multer');
var upload = multer({dest: 'uploads/'});
const admin_auth = require('../middleware/admin_auth');


router.get('/amz/gallery', async(req, res) => {
  try {
    const a = await gallery.show();
    res.render('gallery', {gallery: a});
  } catch (e){
    console.log(e);
    res.json({message: e});
  }
});

router.post('/gallery', upload.single('img_url'), admin_auth, async(req, res) => {
  try {
      const title=req.body.title;
    await gallery.add(req.file.path,title);
    res.redirect('/adminhome');
  } catch (e){
    console.log(e);
    res.json({message: e});
  }
});

router.post('/:id/gallery', admin_auth, async(req, res) => {
  try {
    await gallery.deleteOne(req.params);
    res.redirect('/adminhome');
  } catch (e){
    console.log(e);
    res.json({message: 'error deleting particular gallery image'});
  }
});

module.exports = router;
