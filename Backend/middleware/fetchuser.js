const jwt = require('jsonwebtoken');
const JWT_SECRET = "SurajChaitanyTaj";

const fetchuser = (req,res,next)=>{
    const token = req.header('authtoken');

    if(!token){
     
        res.status(400).json({err:"please authenticate with valid user"})
    }
    try {
        const data = jwt.verify(token,JWT_SECRET);
        req.user = data;
        // console.log(req.user.id);
        next();
    } catch (err) {
        res.status(401).json({error:"please authenticate with valid user"})
    }

}
module.exports = fetchuser;