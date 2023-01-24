const express=require("express");
const {createNewBlog,changeDescription,deleteBlog}=require("./controllers")
const {isAuthenticated}=require("../helper/utils")
const blogRouter=express.Router();

blogRouter.post("/blog",isAuthenticated,createNewBlog);
blogRouter.post("/changeDes",isAuthenticated,changeDescription);
blogRouter.post("/deleteBlog",isAuthenticated,deleteBlog);



module.exports={blogRouter};