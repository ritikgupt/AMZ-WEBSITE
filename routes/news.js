var express = require('express');
var router = express.Router();
const news = require('../db/news');
var multer = require('multer');
var upload = multer({dest: 'uploads/'});

router.get('/shownews',async(req,res)=>{
  try{
    const a = await news.show()
    res.render('shownews',{news:a})
  }catch(e){
    res.json({message:e})
  }
})

router.get('/news', async(req, res) => {
  res.render('news');
});
router.post('/news', upload.single('image'), async(req, res) => {
  try {
    let a = await news.add(req.body, req.file.path);
    res.json({message: 'news added'});
  } catch (e) {
    console.log(e);
    res.json({message: e});
  }
});

router.post('/delete/news', async(req, res) => {
  try {
    let a = await news.deleteAll();
    res.json({message: 'Deleted all news'});
  } catch (e) {
    console.log(e);
    res.json({message: e});
  }
});
router.post('/delete/:id/news', async(req, res) => {
  try {
    let a = await news.deleteOne(req.params);
    res.json({message: 'Deleted the particular news'});
  } catch (e) {
    console.log(e);
    res.json({message: e});
  }
});
router.post('/edit/:id/news', async(req, res) => {
  try {
    let a = await news.edit(req.body, req.params);
    res.json({message: 'edited the particular news'});
  } catch (e) {
    console.log(e);
    res.json({message: e});
  }
});

module.exports = router;
