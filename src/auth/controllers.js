// pwd leng min 6
 // login n signup controlelr
 // uname coreect
 // if corect ask for pwd //
 //return bhi kre
 // salt n pwd dono hi api ke through ni bhr jana chahiye

 // 3 controllers:
 //register,login,reset
const { res } = require("express");
const {User}=require("./models");
const jwt=require("jsonwebtoken");
const Key="gjvjfrenvkrbevrenvu845t5u4thbv"
 const register=async(req,res)=>{
    const {username,password}=req.body;
    const isUserExist=await User.findOne({username:username})
    //ist username reflects schema key ka name
    // 2nd username reflects abhi jis constant se compare krna haii
    if(isUserExist){
        return res.json({
            error:"This username already exits.Kindly choose a new one!"
        })
    }
    if(password.length<6){
        return res.json({
            error:"Password should be atleast 6 characters long."
        })
    }
    var user=new User(req.body)
    user=await user.save()
    // temp undefined so that frontend pe na visible hoe
    // agr iske bd save krenge to permanent undefined hjega
    user.ency_password=undefined;
    user.salt=undefined;
    // var user=await User.create(req.body);

    return res.json({status:"User Created",user:user});
 }

 const commonLogin= async(req,res,next)=>{
    const {username,password}=req.body;
    // . as req.body me object me ara haii islie destructuring it in objects
    
    const isUserExist=await User.findOne({username:username});
    if(!isUserExist){
        return res.json({
            error:"This username doesn't exits. Kindly check!"
        })
    }
    if(!isUserExist.authenticate(password)){
        return res.json({
            error:"The password you entered doesn't match.Kindly check!"
        })
    }

    // how to generate web token
    var token=jwt.sign({_id:isUserExist._id},Key);
    //sign me hmesha object jaega
    // mtlb token generate kro jisme _id store krni haii n on basiss of salt krni haii
    req.body.token=token;
    req.body.user=isUserExist;
    next();
 }
 const login=async(req,res)=>{
    
    return res.json({status:"Logged In succesfully",data:req.body});
 }
 const reset=async(req,res)=>{
    // var user=await User.findOne({username:req.body.username});
    console.log(req.body);
    if(req.body.newPassword.length<6){
        return res.json({
            error:"Please enter a password of atleast length 6"
        })
    }
    const user = req.body.user;
    user.password=req.body.newPassword;
    await user.save()
    return res.json({status:"Done",user:user,token:req.body.token});
 }

 module.exports={register,login,reset,commonLogin,Key}

 //token-heart of all api;s
 // login krnepr token generate krke frontend pe user save krega session storage pe
// diffb t middlware n common fn