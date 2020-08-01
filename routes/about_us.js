const express = require('express');
const router = express.Router();
const client = require('../db/client');
var multer = require('multer');
var upload = multer({dest: 'uploads/'});
const admin_auth = require('../middleware/admin_auth');


router.get('/about_us', async(req, res) => {
  try {
    const a = await client.show();
    res.render('about_us', {client: a});
  } catch (e){
    console.log(e);
    res.json({message: e});
  }
});

router.post('/client', upload.single('img_url'), admin_auth, async(req, res) => {
  console.log(req.file.path);
  try {
    await client.add(req.file.path);
    res.redirect('/adminhome');
  } catch (e){
    console.log(e);
    res.json({message: e});
  }
});

router.post('/:id/client', admin_auth, async(req, res) => {
  try {
    await client.deleteOne(req.params);
    res.redirect('/adminhome');
  } catch (e){
    console.log(e);
    res.json({message: 'error deleting particular client image'});
  }
});

module.exports = router;
