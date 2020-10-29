const express=require("express");
const User=require("../models/users.model");


const router=express.Router();

router.route("/register").post((req,res)=>{
    console.log("Inside the register...");
    const user=new User({
        username:req.body.username,
        password:req.body.password,
        email:req.body.email,
    });
    user.save()
        .then(()=>{
            console.log("USer Registerd....");
            res.send(200).json("OK");
        }).catch(err=>{
            res.send(403).json({
                msg:err
            });
            // res.json("registerd");
        });

});

router.route("/update/:username").patch((req,res)=>{
    User.findOneAndUpdate(
        {
            username:req.params.username
        },
        {
            $set:{
                password:req.body.password
            }
        },
        (err,result)=>{
            if(err){
                return res.status(500).json({msg :err});
            }
            const msg={
                msg:"Password updated!",
                username:req.params.username,
            }
            return res.json(msg);
        }

    );

});
router.route("/delete/:username").delete((req,res)=>{
    User.findOneAndDelete(
        {
            username:req.params.username
        },
        (err,result)=>{
            if(err){
                return res.status(500).json({
                    msg:err
                })
            }
            const msg={
                msg:"User deleted!",
                username:req.params.username
            }
            return res.json(msg);
        }
    )
});

router.route("/:username").get((req,res)=>{
    User.findOne({
        username:req.params.username
    },
    (err,result)=>{
        if(err){
            return res.status(500).json({msg :err});
        }
        const msg={
            msg:"Password updated!",
            username:req.params.username,
            data:result
        }
        return res.json(msg);

    }
    )
})

router.route("/login").post((req,res)=>{
    User.findOne({
        username:req.body.username
    },
    (err,result)=>{
        if(err){
            return res.status(500).json({msg :err});
        }
        if(result==null){
            return res.status(500).json("Eithe email or password incorrect");
        }
        if(result.password==req.body.password){
            //TODO send jwt token
            return res.json("ok");
        }
        return res.status(403).json("password not correct");

    })
    });
module.exports=router;