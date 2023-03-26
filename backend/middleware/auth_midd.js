var jwt=require('jsonwebtoken');

let auth=(req,res,next)=>{
        const token=req.headers.authorization.split(" ")[1];
        if(token){
            let decoded=jwt.verify(token,'masai');
            if(decoded){
                // console.log(decoded)
                req.body.userId=decoded.userID
                // console.log(req.body);
                next();
            }
            else{
                res.status(400).send({"msg":"Please login first"})
            }
        }
        else{
            res.status(400).send({"msg":"Please login first"}) 
        }
    
}
module.exports={auth};