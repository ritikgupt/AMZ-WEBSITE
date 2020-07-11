var express = require('express');
var router = express.Router();
const slider = require('../db/image');
const news = require('../db/news');
const partner = require('../db/partner');
const trusted = require('../db/trusted');
const advisory = require('../db/advisory');
const video = require('../db/video');
const general = require('../db/general');
const newsletter = require('../db/newsletter');
router.get('/', async(req, res) => {
  try {
    let a = await slider.show();
    let b = await news.show();
    let c = await partner.show();
    let d = await trusted.show();
    let e = await advisory.show();
    let f = await video.show();
    res.render('home', {slider: a, news: b, partner: c, trusted: d, advisory: e, video: f});
  } catch (e){
    res.json({message: e});
  }
});

router.post('/', async(req, res) => {
  if(req.body.name !== undefined)
  {
  try {
    await general.add(req.body);
    res.redirect('/');
  } catch (e) {
    res.json({message: e});
  }
}
if(req.body.enrol_id!=undefined)
{
  try{

  }catch (e) {
    res.json({message: e});
  }
}
else{
  try{
await newsletter.add(req.body)
res.redirect('/')
  }catch (e) {
    res.json({message: e});
  }
}
});


module.exports = router;
