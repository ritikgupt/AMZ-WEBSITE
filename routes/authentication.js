const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
var multer = require('multer');
var upload = multer({dest: 'uploads/'});
const auth = require('../db/authentication');

router.get('/register', async(req, res) => {
  try {
    res.render('registeruser');
  } catch (e){
    res.json({message: e});
  }
});
router.post('/register', upload.single('image'), async(req, res) => {
  console.log(req.body);
  try {
    await bcrypt.genSalt(saltRounds, function(err, salt) {
      if (err)
        res.json({message: err});
      else {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
          if (err)
            res.json({message: err});
          else
            auth.add(req.body, hash, req.file.path);
        });
      }
    });
    res.json({message: 'user added'});
  } catch (e){
    res.json({message: e});
  }
});


router.post('/user/delete', async(req, res) => {
  try {
    await auth.deleteAll();
    res.json({message: 'Deleted all users'});
  } catch (e){
    res.json({message: e});
  }
});

router.post('/delete/:username/user', async(req, res) => {
  try {
    let a = await auth.deleteOne(req.params);
    res.json({message: 'Deleted the particular user'});
  } catch (e) {
    console.log(e);
    res.json({message: e});
  }
});
router.post('/edit/:username/user', async(req, res) => {
  try {
    let a = await auth.edit(req.body, req.params);
    res.json({message: 'edited the particular user'});
  } catch (e) {
    console.log(e);
    res.json({message: e});
  }
});

router.get('/login', async(req, res) => {
  try {
    res.render('amz_login');
  } catch (e){
    console.log(e);
    res.json({message: e});
  }
});

router.post('/login', async(req, res) => {
  try {
    let a = await auth.login(req.body);
    console.log(a[0].username);
    const match = await bcrypt.compare(req.body.password, a[0].password);
    if (a[0].username == req.body.username && match)
      res.json({message: 'User successfully logged In'});
    else
      res.json({message: 'Incorrect password entered'});
  } catch (e){
    res.json({message: 'Incorrect credentials'});
  }
});

module.exports = router;
