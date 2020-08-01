var express = require('express');
var router = express.Router();
const slider = require('../db/image');
const news = require('../db/news');
const partner = require('../db/partner');
const trusted = require('../db/trusted');
const advisory = require('../db/advisory');
const award = require('../db/award');
const admin_auth = require('../middleware/admin_auth');
const video = require('../db/video');
const gallery = require('../db/gallery');
const client = require('../db/client');
router.get('/adminhome', admin_auth, async(req, res) => {
  try {
    let a = await slider.show();
    let b = await news.show();
    let c = await partner.show();
    let d = await trusted.show();
    let e = await advisory.show();
    let f = await video.show();
    let g = await award.show();
    let h = await gallery.show();
    let k = await client.show();
    res.render('adminhome', {slider: a, news: b, partner: c, trusted: d, 
      advisory: e, video: f, award: g, gallery: h,client:k});
  } catch (e){
    res.json({message: e});
  }
});

router.get('/admin/enquiry', (req, res) => {
  res.render('enquiry');
});


module.exports = router;
