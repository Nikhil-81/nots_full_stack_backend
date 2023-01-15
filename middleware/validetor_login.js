const Users = require("../model/usermodel/user_singin.model")
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const validetor_login=async(req,res,next)=>{
    try{
        let D=await Users.find({username:req.body.username})
        console.log(D)
        if(D.length>0){
            let hash=D[0].password
            bcrypt.compare(req.body.password, hash, (err, result)=>{
                // result == true
                if(err){
                    res.send(`somenthing went wrong login again ${err}`)
                }
                else if(result==true){
                    var token = jwt.sign({ username:req.body.username },"masai");
                    console.log(token)
  
                    req.body.token=token
                    next()
                }
                else{
                    res.status(400).send("Error")
                }
            });
        }
    }
    catch(err){
        res.send(`something went wrong ${err}`)
    }
}

module.exports=validetor_login