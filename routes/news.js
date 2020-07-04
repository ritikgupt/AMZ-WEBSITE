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
    await news.add(req.body, req.file.path);
    res.redirect('/news')
  } catch (e) {
    console.log(e);
    res.json({message: e});
  }
});

router.post('/delete/news', async(req, res) => {
  try {
    await news.deleteAll();
    res.redirect('/shownews')
  } catch (e) {
    console.log(e);
    res.json({message: e});
  }
});

router.post('/delete/:id/news', async(req, res) => {
  try {
    await news.deleteOne(req.params);
    res.redirect('/shownews')
  } catch (e) {
    console.log(e);
    res.json({message: e});
  }
});

router.get('/edit/:id/news',async(req,res)=>{
  try{
  let a = await news.showone(req.params);
  res.render('editnews',{news:a});
  }
  catch (e) {
    console.log(e);
    res.json({message: e});
  }
})
router.post('/edit/:id/news', async(req, res) => {
  try {
    let a = await news.edit(req.body, req.params);
    res.redirect('/shownews')
  } catch (e) {
    console.log(e);
    res.json({message: e});
  }
});

module.exports = router;
