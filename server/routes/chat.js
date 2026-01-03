import express from 'express'
import baselineGenerator from '../agents/agent1.js'
const router=express.Router()

router.post('/chat',async (req,res)=>{
    const {message}=req.body
    console.log(message)
    const draft=await baselineGenerator(message)
    res.json({message:draft})
})

export default router