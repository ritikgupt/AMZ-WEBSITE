var express = require('express');
var router = express.Router();
const slider = require('../db/image');
const news = require('../db/news');
const partner = require('../db/partner');
const trusted = require('../db/trusted');
const advisory = require('../db/advisory');
const video = require('../db/video');
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

router.get('/admin/enquiry', (req, res) => {
  res.render('enquiry');
});


module.exports = router;
