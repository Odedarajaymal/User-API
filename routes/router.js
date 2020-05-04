const express = require('express')
const router = express.Router()
const JK = require('../models/user')
const Auth = require('../middelear/Auth') 
const {findbyemail} = require('../email/email')



router.post('/user/signup',async(req,res)=>{
   const jk = new JK()
   try{
       jk.email = req.body.email
       jk.password = req.body.password
       await jk.save()
       findbyemail(jk.email)
       const token = await jk.generateAuthToken()
       res.status(201).send({ jk, token })
   }catch(e){
       console.log('err',e)
   }
})


router.post('/user/signin',async (req,res)=>{
    try{
  const  jk =  await JK.findByCredentials(req.body.email, req.body.password)
  const token =  await jk.generateAuthToken()
    res.send({ jk, token })
    }catch (e){
      console.log('err',e)
    }

})

router.get('/user/me',Auth, async (req,res)=>{
  res.send(req.jk)
})

router.post('/user/logout',Auth, async (req,res)=>{
    try{
    req.jk.tokens = req.jk.tokens.filter((token)=>{
        return token.token !== req.token
    })
    await jk.save()
    res.send(jk)
}catch(e){
   res.status(404).send({e:'some errors'})
}
})

router.post('/user/logoutAll',Auth, async (req,res)=>{
    try{
    req.jk.tokens = []
    await req.jk.save()
    res.send()
    }catch(e){
        res.status(404).send({e:"some error"})
    }
})



module.exports = router