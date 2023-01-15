const bcrypt = require('bcrypt');
const Users = require('../model/usermodel/user_singin.model');
const validetor_singin=async (req,res,next)=>{
    try{
        let D=await Users.find({username:req.body.username})
        console.log(D)
        if(D.length>0){
            res.status(400).send("User already exist")
        }
        else{
            bcrypt.hash(req.body.password, 4, (err, hash)=>{
                if(err){
                    res.send(`something went wrong plz singin again ${err}`)
                }
                else{

                    req.body.password=hash
                    next()
                }
            });
          
        }
    }
    catch(err){
        res.send(`something went wrong ${err}`)
    }
}
module.exports=validetor_singin