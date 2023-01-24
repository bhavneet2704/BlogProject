// 1. auth-user
//2. blog-title,description,foreign key(connected with user id)(relation of pne to many)
//comment-comment,user_id,blog_id(2 fkeys)

// model,controller,routes


const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const bodyParser=require("body-parser");
var colors = require('colors');
const authRouter=require("./src/auth/router.js")
const {blogRouter}=require("./src/blog/router")

const app=express();

//middleware
app.use(cors());
app.use(bodyParser.json());

// DB Connection
mongoose.connect("mongodb://localhost:27017/blog_g16")
mongoose.connection.on("connected",()=>{
    console.log("DB Connected !".underline.cyan);
})
mongoose.connection.on("error",()=>{
    console.log("DB Connection failed!");
})
app.use("/auth",authRouter);
app.use("/blog",blogRouter);
app.listen(4000,()=>{
    console.log("Server started on 4000 !");
});