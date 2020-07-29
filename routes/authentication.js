const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const student = require('../db/student');
const admin = require('../db/admin-auth');
const saltRounds = 10;
// var multer = require('multer');
// var upload = multer({dest: 'uploads/'});
// try {
//   bcrypt.genSalt(saltRounds, function(err, salt) {
//     if (err)
//       console.log(err)
//     else {
//       bcrypt.hash('123', salt, async(err, hash) => {
//         if (err)
//           console.log(err)
//         else {
//           const password = hash;
//           await admin.add('123',password);
//         }
//       });
//     }
//   });
// } catch (e){
//   console.log(e)
// }

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
          password: a[0].password,
          img_url: a[0].img_url,
        }, 'amz_automotive', {
          expiresIn: '1h',
        });
        res.cookie('token', token);
        res.redirect('/studentportal');
      } else
        res.json({message: 'Incorrect Password'});
    }
  } catch (e){
    res.json({message: e});
  }
});

router.get('/student/login', async(req, res) => {
  res.render('login');
});

router.get('/admin/login', (req, res) => {
  res.render('adminlogin');
});

router.post('/admin/login', async(req, res) => {
  try {
    const id = req.body.id;
    console.log(id);
    const a = await admin.showOne(id);
    if (a.length <= 0){
      res.json({message: 'Incorrect Serial Number'});

    } else {
      const match = await bcrypt.compare(req.body.password, a[0].password);
      if (match) {
        const token = await jwt.sign({
          id: a[0].id,
          password: a[0].password,
        }, 'amz_automotive', {
          expiresIn: '1h',
        });
        res.cookie('token', token);
        res.redirect('/adminhome');
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
