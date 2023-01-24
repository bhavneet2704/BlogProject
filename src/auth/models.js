const mongoose=require("mongoose");
const uuid=require("uuid");
const CryptoJS=require("crypto-js");
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        trim:true,
    },
    name:String,
    ency_password:String,
    salt:String,
    // here salt is used just as another name for key
    email:String,

},{timestamps:true});

// we do toJSON:{virtuals:true} if we want to read the value of virtual also
// here in this case we just wanna save virtuals n dont wanna read them so not doing virtuals:true here
//virtual for pwd
// y using simple fn n not arrow fn
// bcs arrow fn can't access this wheres we will be needing this to get uske keys


userSchema.methods={
    securePassword:function(planePassword){
        return CryptoJS.SHA256(planePassword,this.salt).toString();
    },
    authenticate:function(password){
        return this.ency_password===this.securePassword(password)
        
    }
   
}
//pwd naam se jo aega frontend se

userSchema.virtual("password").set(function(planePassword){
this.salt=uuid.v4();
this.ency_password=this.securePassword(planePassword);
});

const User=mongoose.model("User",userSchema);
module.exports={User}