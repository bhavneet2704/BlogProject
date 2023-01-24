// in middleware 3 args -req , re are objects n next is a fn

const jwt=require("jsonwebtoken");
const {Key}=require("../auth/controllers");
const { User } = require("../auth/models");
const isAuthenticated=async(req,res,next)=>{
    token=req.headers.authorization;
    if(!token){
        return res.json({
            status:"Error",
            message:"Token required"
        })
    }
    try{
    var verify=jwt.verify(token,Key);
    console.log("verify:  ")
    console.log(verify);
    if(verify && verify._id){
        var user=await User.findById(verify._id)
    
    if(!user){
        return res.json({status:"Error",message:"Unauthorized User"})
    }
    req.body.user_id=user._id;
    next();
}

    //console.log("INFO:",verify);
    else{
    return res.json({
        status:"Error",
        message:"Valid token required"
    })
}
}
    catch{
        return res.json({
            status:"Error",
            message:"InValid token"
        })
    }
};

module.exports={isAuthenticated}
// ways to send tokens
//headers,query,params n body(can send token in body only while using post)

// create middlewraresto chk all arre filled n email is in correct syntax