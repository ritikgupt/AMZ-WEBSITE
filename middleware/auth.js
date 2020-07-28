const jwt = require('jsonwebtoken');
const JwtAuth = (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log(token);
    console.log('fg');
    const decode = jwt.verify(token, 'amz_automotive');
    req.userData = decode;
    next();
  } catch (e){
    console.log(e);
    res.status(401).json({
      error: 'Invalid Token',
    });
  }
};

module.exports = JwtAuth;
