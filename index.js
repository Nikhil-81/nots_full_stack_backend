const express=require("express")
const CONNECT = require("./config/db")
require('dotenv').config()
const PORT=process.env.PORT
const cors=require("cors")
const UserRout=require('./model/usermodel/user.router')
const Notes_route = require("./model/notesmodel/notes.rout")
const app=express()
app.use(express.json())
app.use(cors())
app.use("/user",UserRout)
app.use("/note",Notes_route)

app.get("/",(req,res)=>{
    req.send("HEllo")
})

app.listen(PORT,async()=>{
    try{
        await CONNECT
        console.log(`server is running at port ${PORT}`)
    }
    catch(err){
        console.log(`something went wrong ${err}`)

    }
})