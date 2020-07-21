var express = require('express');
var router = express.Router();
const slider = require('../db/image');
const news = require('../db/news');
const partner = require('../db/partner');
const trusted = require('../db/trusted');
const advisory = require('../db/advisory');
const video = require('../db/video');
var multer = require('multer');
var upload = multer({dest: 'uploads/'});
router.get('/adminhome', async(req, res) => {
  try {
    let a = await slider.show();
    let b = await news.show();
    let c = await partner.show();
    let d = await trusted.show();
    let e = await advisory.show();
    let f = await video.show();
    res.render('adminhome', {slider: a, news: b, partner: c, trusted: d, advisory: e, video: f});
  } catch (e){
    res.json({message: e});
  }
});
router.post('/adminhome', upload.single('image'), async(req, res) => {
  if(req.body.identifier=='Trusted')
  {
  try {
    const identifier=req.body.identifier
    await trusted.add(req.file.path,identifier);
    res.redirect('/adminhome');
  } catch (e){
    console.log(e);
    res.json({message: e});
  }
}
});

module.exports = router;
