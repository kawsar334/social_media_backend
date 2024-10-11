


const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next)=>{
    const token = req.cookies.token;
    try{
        
        if(!token){
            return res.status(401).json({
                message:"token is Not valid ",
                success:false
            })
        }else{
            jwt.verify(token,process.env.SECRETE,(err, user)=>{
                if(err){
                    return res.status(200).json({
                        message:"You are not authenticated"
                    })
                }else{
                    req.user = user;
                    next();
                }
            }) 
        }
    }catch(err){
        console.log(token)
        console.log(err);
}
};



module.exports = { verifyToken }

