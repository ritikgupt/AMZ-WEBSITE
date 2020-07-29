var express = require('express');
var router = express.Router();
const slider = require('../db/image');
const news = require('../db/news');
const partner = require('../db/partner');
const trusted = require('../db/trusted');
const advisory = require('../db/advisory');
const award = require('../db/award')
const admin_auth = require('../middleware/admin_auth');
const video = require('../db/video');
router.get('/adminhome', admin_auth, async(req, res) => {
  try {
    let a = await slider.show();
    let b = await news.show();
    let c = await partner.show();
    let d = await trusted.show();
    let e = await advisory.show();
    let f = await video.show();
    let g= await award.show();
    res.render('adminhome', {slider: a, news: b, partner: c, trusted: d, advisory: e, video: f,award:g});
  } catch (e){
    res.json({message: e});
  }
});

router.get('/admin/enquiry', (req, res) => {
  res.render('enquiry');
});


module.exports = router;
