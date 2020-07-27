const jwt = require('jsonwebtoken');
module.exports=(req,res,next)=>{
    try{
    const token = req.body.token
    const decode = jwt.verify(token,'amz_automotive')
    next()
    }catch(e){
        res.status(401).json({
            error:"Invalid Token"
        })
    }
})