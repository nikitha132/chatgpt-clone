import express, { response } from "express";
import bodyParser from "body-parser";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from 'cors';

dotenv.config()
const app=express()
app.use(express.json())
app.use(bodyParser.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.send("Hello World");
})

app.post("/api/chat",async (req,res)=>{
    const data={
        model:"gpt-3.5-turbo",
        messages:[
            {
                role:"system",
                content:"you are a helpful assistant"
            }
        ]
    }
    const messages=req.body.messages;
    try {
        const response=await fetch("https://api.openai.com/v1/chat/completions",{
            method:"POST",
            headers:{
                Authorization:"Bearer "+process.env.OPENAI_API_KEY,
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                ...data,
                messages:[...data.messages,...messages],
            })
        })
    const json = await response.json()
    res.json({question:messages,answer:json.choices})    
    } catch (error) {
        console.log(error);
    }
})

app.listen(8000,()=>{
    console.log("Server is Up");
})