const {Blog}=require("./models")

const createNewBlog = async (req,res)=>{
    // const {title,description} = req.body;

     const blog = await( await Blog.create(req.body) ).populate("user_id");
    //const blog = await( await Blog.find() ).populate("user_id");
    return res.json({status:"Created Blog",blog})
}
const changeDescription=async (req,res)=>{
    //user id jo mile hai usse uska blog nikaalna haiia
    const {description,blog_id}=req.body;
    const blog=await Blog.findById(blog_id);
    blog.description=description;
    blog.save();
    return res.json({status:"Description changed",blog:blog});
}
const deleteBlog=async(req,res)=>{
    const{blog_id}=req.body;
    const deletedBlog=await Blog.findByIdAndDelete(blog_id);
    return res.json({status:"Deleted Blog",data:deleteBlog})
}
module.exports =  {createNewBlog,changeDescription,deleteBlog}