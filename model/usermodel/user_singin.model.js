const mongoose=require("mongoose")
const UserSchema= new mongoose.Schema({
    name:String,
    username:String,
    password:String,
})

const Users=mongoose.model("user",UserSchema)

module.exports=Users