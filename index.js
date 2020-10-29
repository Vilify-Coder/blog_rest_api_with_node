const express=require("express");
const mongoose=require("mongoose");
const { use } = require("./routes/user");
const Port=process.env.Port||5000;
const app=express();


mongoose.connect('mongodb://localhost:27017/myapp',
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
app.use(express.json());
const userRoute=require("./routes/user");
app.use("/user",userRoute);




app.route("/").get((req,res)=>res.json("Your first api from server...."));


app.listen(Port,()=>{
    console.log(`listing on  ${Port}`);
})