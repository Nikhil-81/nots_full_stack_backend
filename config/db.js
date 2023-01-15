const mongoose =require("mongoose")
require('dotenv').config()

mongoose.set("strictQuery",false)
let CONNECT=mongoose.connect(process.env.DB)

module.exports=CONNECT
