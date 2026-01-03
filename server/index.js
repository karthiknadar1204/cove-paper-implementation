import express from 'express'
import chatRoutes from './routes/chat.js'
const app=express()
app.use(express.json())
app.use('/api',chatRoutes)


app.listen(3004,()=>{
    console.log('Server is running on port 3004')
})