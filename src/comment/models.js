const {Schema}=require("mongoose");
const commentSchema=new Schema({
    comment:String,
    user_id:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    blog_id:{
        type:Schema.Types.ObjectId,
        ref:"Blog"
    }
},
{
    timestamps:true
});

const Comment=mongoose.model("Comment",commentSchema);
module.exports={Comment}