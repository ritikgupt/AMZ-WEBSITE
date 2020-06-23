var express = require('express');
var router = express.Router();
const slider = require('../db/image');
var multer = require('multer');
var upload = multer({dest: 'uploads/'});
router.post('/slider', upload.single('image'), async(req, res) => {
  console.log(req.file);
  try {
    let a = await slider.add(req.file.path);
    res.json({message: 'slider added ' + req.body.img_url});
  } catch (e){
    console.log(e);
    res.json({message: e});
  }

});

router.post('/delete/slider', async(req, res) => {
  try {
    let a = await slider.deleteAll(req);
    res.json({message: 'deleted all slider'});
  } catch (e){
    console.log(e);
    res.json({message: 'error deleting all slider'});
  }
});

router.post('/:url/slider', async(req, res) => {
  console.log(req.params);
  try {
    let a = await slider.deleteOne(req.params);
    res.json({message: 'deleted particular slider'});
  } catch (e){
    console.log(e);
    res.json({message: 'error deleting particular slider'});
  }
});

module.exports = router;
