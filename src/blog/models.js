const {Schema,model}=require("mongoose");
const blogSchema=new Schema({
    title:String,
    description:String,
    user_id:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true,
        // agr alg alg collections se scehema use krenge then we will use ref:User n need to import it
        // bcs abhi we are juts using 1 collection so ye apne aap dhund llega
    }
},
{
    timestamps:true
});

const Blog=model("Blog",blogSchema);
module.exports={Blog}