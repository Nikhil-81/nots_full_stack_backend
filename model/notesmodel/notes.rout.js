const Notes = require("./notes.model");
const express=require("express")
const Notes_route=express.Router()
var jwt = require('jsonwebtoken');


const authentication=async(req,res,next)=>{
    let token=req.headers.auth
    console.log(token)
    jwt.verify(token, 'masai', function(err, decoded) {
        if(err){
                res.send(`something went wrong ${err}`)
        }
        else{
            req.body.userid=decoded.username
            next()
        }

      });
}

Notes_route.get("/",authentication,async(req,res)=>{
    try{
        let D=await Notes.find({userid:req.body.userid})
        res.send(D)
    }
    catch(err){
        res.status(400).send(`something went wrong ${err}`)
    }
   
})

Notes_route.post("/",authentication,async(req,res)=>{
   try{
    await Notes.create(req.body)
    res.send("Notes are been added")
   }
   catch(err){
    res.status(400).send(`${err}`)
   }
})


Notes_route.delete(`/:id`,authentication,async(req,res)=>{
    let id=req.params.id
    try{
        let D=await Notes.find({_id:id},{userid:req.body.userid})
        if(D.length>0){
            await Notes.findByIdAndDelete({_id:id})
            res.send("Note removed")
        }
        else{
            res.send(`note with id ${id} does not exist`)
        }
    }
    catch(err){
     res.status(400).send(`${err}`)
    }
 })
 
Notes_route.patch(`/:id`,authentication,async(req,res)=>{
    let id=req.params.id
    let data=({...req.body})
    delete(data.userid)
    try{
        let D=await Notes.find({_id:id},{userid:req.body.userid})
        if(D.length>0){
            await Notes.findByIdAndUpdate({_id:id},{...data})
            res.send("Note updated")
        }
        else{
            res.send(`note iwth id ${id} does not exist`)
        }
    }
    catch(err){
     res.status(400).send(`${err}`)
    }
 })
 



module.exports=Notes_route