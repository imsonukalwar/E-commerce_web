
const User = require("../models/model");
const jwt=require('jsonwebtoken');



const isaouthenticated=async(req,res,next)=>{
    try {
        const aouthHeader=req.headers.authorization;
          // 1️ Header check
        if(!aouthHeader||!aouthHeader.startsWith("Bearer ")){
            return res.status(401).json({
            success:false,
            message:"aouthorization token is missing and invalied",
            });
        }
        // 2️ Token extract
        const token = aouthHeader.split(" ")[1];

        let decoded;
        try {
            decoded=jwt.verify(token,process.env.KEY)
        
        } catch (error) {
            if (error.name === "TokenExpiredError"){
                return res.status(401).json({
            success:false,
            message:"The registration token has expires",
            });
            }
            return res.status(401).json({
            success:false,
            message:'access token is missing and invalied',
            });
        }
         // 3️ User check
        const user=await User.findById(decoded.id)
        if(!user){
            return res.status(400).json({
            success:false,
            message:"user not found",
            })
        }
         // 4️ Pass control
        req.user=user
        req.id=user._id
        next();
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
            })
    }
}


const isAdmin=async(req,res,next)=>{
        if(req.user && req.user.role==='admin'){
            return next();
        }else{
            return res.status(403).json({
                message:"Access denied: only for Admin"
            })
        }
}

module.exports={isaouthenticated,isAdmin};