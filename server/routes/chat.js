import express from 'express'
import baselineGenerator from '../agents/agent1.js'
import verificationPlanner from '../agents/agent2.js'
import verificationExecutor from '../agents/agent3.js'
import finalResponseGenerator from '../agents/agent4.js'
const router=express.Router()

router.post('/chat',async (req,res)=>{
    const {message}=req.body
    console.log(message)
    const draft=await baselineGenerator(message)
    const verificationQuestions = await verificationPlanner(message, draft);
    const verifications = await verificationExecutor(verificationQuestions);
    const finalResponse = await finalResponseGenerator(message, draft, verifications);

    res.json({message:finalResponse})
})

export default router