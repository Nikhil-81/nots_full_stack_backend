const mongoose =require("mongoose")
let Notes_schema=new mongoose.Schema({
    note:String,
    title:String,
    userid:String,
})

let Notes=mongoose.model("note",Notes_schema)

module.exports=Notes