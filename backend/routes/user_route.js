let express=require("express");
let userRouter=express.Router();
let {UserModel}=require("../model/user_model")
var jwt = require('jsonwebtoken');
let bcrypt=require("bcrypt")


userRouter.get("/",async(req,res)=>{
    res.send("Home Page");
})

userRouter.post("/register",async(req,res)=>{
    let {email,pass,location,age}=req.body;
    try {

        bcrypt.hash(pass, 5,async function(err, hash) {
            // Store hash password in your DB.
            let user=new UserModel({email,pass:hash,location,age});
            await user.save();
            res.status(200).send({"msg":"Registration Successfully"})
        });
    } catch (error) {
        res.status(400).send({"msg":error.msg})
    }
})


//Authentication
userRouter.post("/login",async(req,res)=>{
    let {email,pass}=req.body;
    try {
        let user=await UserModel.find({email});
        // console.log(user)
        if(user.length>0) {
            console.log(user)
            bcrypt.compare(pass, user[0].pass,function(err,result) {
                if(result){
                    res.status(200).send({"msg":"Login Successfully","token":jwt.sign({ userID:user[0]._id}, 'masai')}) ;
                }
                else{
                    res.status(400).send({"msg":"Wrong credential, Login Failed"});
                }
            });
        } 
        else{
            res.status(400).send({"msg":"User is not present"});
        }
    } catch (error) {
        res.status(400).send({"msg":error.msg});
    }
})

//Authorized
userRouter.get("/detail",async(req,res)=>{
    let token=req.headers.authorization
    
    try {
        jwt.verify(token, 'masai', function(err, decoded) {
            if(decoded){
                res.status(200).send({"msg":"Detail"})
            }
            else{
                res.status(400).send({"msg":err.msg})
            }
        });
    } catch (error) {
        res.status(400).send({"msg":error.msg})
    }
})

userRouter.get("/read",async(req,res)=>{
    let token=req.headers.authorization
    
    try {
        jwt.verify(token, 'masai',async function(err, decoded) {
            if(decoded){
                let user=await UserModel.find();
                // console.log(user);
                res.status(200).send(user);
            }
            else{
                res.status(400).send({"msg":err.msg})
            }
        });
    } catch (error) {
        res.status(400).send({"msg":error.msg})
    }
})

module.exports={userRouter}