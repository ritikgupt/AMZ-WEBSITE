var express = require('express');
var router = express.Router();
const events = require('../db/events');
var multer = require('multer');
var upload = multer({dest: 'uploads/'});

router.get('/amz/events', async(req, res) => {
  try {
    const a = await events.show();
    res.render('events', {events: a});
  } catch (e){
    console.log(e);
    throw e;
  }
});

router.post('/events', upload.single('img_url'), async(req, res) => {
  try {
    const title = req.body.title;
    const university = req.body.university;
    const data = req.body.date;
    await events.add(title, university, data, req.file.path);
    res.redirect('/adminhome');
  } catch (e) {
    console.log(e);
    res.json({message: e});
  }
});


router.post('/delete/:id/events', async(req, res) => {
  try {
    await events.deleteOne(req.params);
    res.redirect('/adminhome');
  } catch (e) {
    console.log(e);
    res.json({message: e});
  }
});

module.exports = router;
