const jwt=require("jsonwebtoken");
const JWT_Secret = require("../config");


function authMiddleware(req , res , next){
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(403).json({ error: "Authorization token is missing or malformed" });
    }
    const token= authHeader.split(' ')[1];
    try{
        const decoded = jwt.verify(token,JWT_Secret);
        if(decoded.userId){
            req.userId=decoded.userId;
            next();
        }else{
            res.status(403).json({error: "Invalid token payload" });
        }

    }catch(e){
        res.status(403).json({ error: "Token verification failed" });
    }
}
module.exports={
    authMiddleware
}