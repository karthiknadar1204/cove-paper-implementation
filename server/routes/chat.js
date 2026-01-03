import express from 'express'

const router=express.Router()

router.post('/chat',(req,res)=>{
    const {message}=req.body
    console.log(message)
    res.json({message:message})
})

export default router