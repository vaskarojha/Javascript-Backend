import dotenv from "dotenv"
import express from 'express'
import connect_db from './db.js'
dotenv.config({
    path:'../../.env'
})

const app = express()

connect_db()
app.get('/', (req,res)=>{
    res.send("Server running...")
})