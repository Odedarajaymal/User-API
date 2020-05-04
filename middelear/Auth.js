const jwt = require('jsonwebtoken')
const JK = require('../models/user')



const Auth = async(req,res,next)=>{
    try{
        const token = req.header('Authorization').replace('Bearer ', '')
   const decode =  jwt.verify(token,process.env.token)
   const jk = await JK.findOne({_id:decode._id,'tokens.token':token})

   if(!jk){
       throw new Error('');
   }
   req.token = token
   req.jk = jk 
   next()
     
   
    }catch(e){
        res.status(404).send({e:'you not Authorization'})
    }

}

module.exports = Auth