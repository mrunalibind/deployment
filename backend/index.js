let express=require("express");
let app=express();
app.use(express.json())
let {connection}=require("./db")
let {userRouter}=require("./routes/user_route")
app.use("/user",userRouter);
let {noteRouter}=require("./routes/note_route");
let {auth}=require("./middleware/auth_midd")
const cors=require("cors")
app.use(cors())
app.use(auth)
app.use("/note",noteRouter);
require("dotenv").config();

app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("Connected to Db")
    } catch (error) {
        console.log(error);
    }
    console.log("Server is running on port no",process.env.port);
})