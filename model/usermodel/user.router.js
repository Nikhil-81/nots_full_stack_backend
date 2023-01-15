const express=require("express")
const validetor_singin = require("../../middleware/SINGIN_VALIDETOR.JS")
const validetor_login = require("../../middleware/validetor_login")
const UserRout=express.Router()
const Users=require("./user_singin.model")



UserRout.post("/singin",validetor_singin,async(req,res)=>{
try{
    await Users.create({...req.body})
    res.send("Sing in sucessfull")
}
catch(err){
    res.status(400).send(`something went wrong ${err}`)
}
})


UserRout.post("/login",validetor_login,async(req,res)=>{
    try{
        res.send({"username":req.body.username,
                "token":req.body.token})
    }
    catch(err){
        res.status(400).send(`something went wrong ${err}`)
    }
    })
    
    

module.exports=UserRout