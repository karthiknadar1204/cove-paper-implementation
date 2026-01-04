import express from 'express'
import cors from 'cors'
import chatRoutes from './routes/chat.js'
const app=express()

// Handle preflight requests
app.options('*', cors())

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type']
}))
app.use(express.json())
app.use('/api',chatRoutes)


app.listen(3004,()=>{
    console.log('Server is running on port 3004')
})