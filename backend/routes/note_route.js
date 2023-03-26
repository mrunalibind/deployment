let express=require("express");
let noteRouter=express.Router();
let {NoteModel}=require("../model/note_model");

noteRouter.get("/",async(req,res)=>{
    try {
        let note=await NoteModel.find();
        // console.log(note)
        res.status(200).send(note);
    } catch (error) {
        res.status(400).send({"msg":error.msg})
    }
})

noteRouter.post("/add",async(req,res)=>{
    try {
        // console.log("req.body",req.body)
        let payload=req.body;
        let note=new NoteModel(payload);
        // console.log(note);
        await note.save();
        res.status(200).send({"msg":"Note has been Added"})
    } catch (error) {
        res.status(400).send({"msg":error.msg})
    }
})

noteRouter.patch("/update/:Id",async(req,res)=>{
    let {Id}=req.params;
    try {
        let payload=req.body;
        await NoteModel.findByIdAndUpdate({_id:Id},payload)
        res.status(200).send({"msg":"Note has been Updated"})
    } catch (error) {
        res.status(400).send({"msg":error.msg})
    }
})

noteRouter.delete("/delete/:Id",async(req,res)=>{
    let {Id}=req.params;
    try {
        await NoteModel.findByIdAndDelete({_id:Id})
        res.status(200).send({"msg":"Note has been Deleted"})
    } catch (error) {
        res.status(400).send({"msg":error.msg})
    }
})

module.exports={noteRouter}