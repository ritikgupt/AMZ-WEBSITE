const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const auth = require('../db/authentication');

router.post('/forgot', async(req, res) => {
  console.log(req.body);
  try {
    let a = await auth.login(req.body);
    console.log('gfg');
    console.log(a[0]);
    console.log(a[0].username);
    const match = await bcrypt.compare(req.body.oldpassword, a[0].password);
    if (a[0].username == req.body.username && match){
      await bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(req.body.newpassword, salt, function(err, hash) {
          console.log(hash);
          auth.update(hash, a[0].username);
        });
      });
      res.json({message: 'password updated'});
    } else
      res.json({message: 'Incorrect password entered'});
  } catch (e){
    res.json({message: 'Incorrect credentials'});
  }
});


module.exports = router;
