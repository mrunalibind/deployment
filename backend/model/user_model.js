let mongoose=require("mongoose");

let userSchema=mongoose.Schema({
    email:String,
    pass:String,
    location:String,
    age:Number
},{
    versionKey:false
})

let UserModel=mongoose.model("user",userSchema)

module.exports={UserModel}