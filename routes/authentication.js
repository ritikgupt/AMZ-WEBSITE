const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const student = require('../db/student');
// var multer = require('multer');
// var upload = multer({dest: 'uploads/'});

router.post('/student/login', async(req, res) => {
  try {
    const id = req.body.serial;
    const a = await student.showOne(id);
    if (a.length <= 0){
      res.json({message: 'Incorrect Serial Number'});

    } else {
      const match = await bcrypt.compare(req.body.password, a[0].password);
      if (match) {
        const token = await jwt.sign({
          email: a[0].email,
          enroll_id: a[0].enroll_id,
        }, 'amz_automotive', {
          expiresIn: '1h',
        });
        res.json({message: 'User successfully logged In', token: token});
      } else
        res.json({message: 'Incorrect Password'});
    }
  } catch (e){
    res.json({message: e});
  }
});


// router.post('/user/delete', async(req, res) => {
//   try {
//     await auth.deleteAll();
//     res.json({message: 'Deleted all users'});
//   } catch (e){
//     res.json({message: e});
//   }
// });

// router.post('/delete/:username/user', async(req, res) => {
//   try {
//     let a = await auth.deleteOne(req.params);
//     res.json({message: 'Deleted the particular user'});
//   } catch (e) {
//     console.log(e);
//     res.json({message: e});
//   }
// });
// router.post('/edit/:username/user', async(req, res) => {
//   try {
//     let a = await auth.edit(req.body, req.params);
//     res.json({message: 'edited the particular user'});
//   } catch (e) {
//     console.log(e);
//     res.json({message: e});
//   }
// });

// router.get('/login', async(req, res) => {
//   try {
//     res.render('amz_login');
//   } catch (e){
//     console.log(e);
//     res.json({message: e});
//   }
// });

// router.post('/login', async(req, res) => {
//   try {
//     let a = await auth.login(req.body);
//     console.log(a[0].username);
//     const match = await bcrypt.compare(req.body.password, a[0].password);
//     if (a[0].username == req.body.username && match)
//       res.json({message: 'User successfully logged In'});
//     else
//       res.json({message: 'Incorrect password entered'});
//   } catch (e){
//     res.json({message: 'Incorrect credentials'});
//   }
// });

module.exports = router;
