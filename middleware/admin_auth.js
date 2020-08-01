const jwt = require('jsonwebtoken');
const admin_JwtAuth = (req, res, next) => {
  try {
    const token = req.cookies.token;
    const decode = jwt.verify(token, 'amz_automotive');
    req.adminData = decode;
    next();
  } catch (e){
    res.redirect('/admin/login');
  }
};

module.exports = admin_JwtAuth;
