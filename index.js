const express=require("express");
const mongoose=require("mongoose");
const { use } = require("./routes/user");
const Port=process.env.PORT||5000;
const app=express();


mongoose.connect('mongodb+srv://Nirmal:Example@vilify.com@cluster0.hxlnk.mongodb.net/myapp',
 {
     useNewUrlParser: true,
     useCreateIndex:true,
     useUnifiedTopology:true
    });
const connection=mongoose.connection;

connection.once("open",()=>{
    console.log("Conected!");
});

//middleware....
app.use("/uploads",express.static("uploads"))
app.use(express.json());
const userRoute=require("./routes/user");
app.use("/user",userRoute);
const profileRoute=require("./routes/profile");
app.use("/profile",profileRoute);
const blogRoute=require("./routes/blogpost");
app.use("/blogPost",blogRoute);




app.route("/").get((req,res)=>res.json("Your first api from server...."));


app.listen(Port,"0.0.0.0",()=>{
    console.log(`listing on  ${Port}`);
})