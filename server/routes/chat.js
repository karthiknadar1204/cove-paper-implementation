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
    console.log("this is the draft",draft)
    const verificationQuestions = await verificationPlanner(message, draft);
    console.log("this is the verification questions",verificationQuestions)
    const verifications = await verificationExecutor(verificationQuestions);
    console.log("this is the verifications",verifications)
    const finalResponse = await finalResponseGenerator(message, draft, verifications);
    console.log("this is the final response",finalResponse)

    res.json({message:finalResponse})
})

export default router
