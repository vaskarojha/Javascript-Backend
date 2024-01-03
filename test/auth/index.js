import dotenv from "dotenv"
import express from 'express'
import connect_db from './db.js'
import { TestUser } from "./model/testUser.js"
import bcrypt from 'bcryptjs'
import Jwt from "jsonwebtoken"
import cookieParser from "cookie-parser"
import {auth} from "./auth.middleware.js"
import upload from './upload.middeware.js'

dotenv.config({
    path:'../../.env'
})


const app = express()
app.use(express.json())
app.use(cookieParser())
connect_db()
app.get('/', (req,res)=>{
    res.send("Server running...")
})

app.post('/register', async(req, res)=>{
    try{
        const {firstname, lastname, email, password} = req.body
        if(!(firstname && lastname && email && password)){
            res.status(401).send("All field required!!")
        }
        const emailExist = await TestUser.findOne({email:email}) 
        if(emailExist){
            res.status(401).send("Email already exists")
        }

        const hashPassword = await bcrypt.hash(password, 8)

        const user = TestUser.create({
            firstname,
            lastname,
            email,
            password:hashPassword
        })

        const token = Jwt.sign({
            id:user._id,
            email:user.email
        }, 
        "mySecretKey",
        {expiresIn:'5h'}
        )

        user.token = token
        user.password = undefined

        res.status(201).json(user)

    } catch(err){
        console.log(err.message)
    }
})

app.post('/login', async(req, res)=>{
    try{
        const {email, password} = req.body

        if(!(email&& password)){
            res.status(401).send("Email and password required!")
        }
        const user = await TestUser.findOne({email})
        if(!user){
            res.status(404).send("Email or password incorrect!!")
        }

        const correctPassword = await bcrypt.compare(password,user.password)
        if(!correctPassword){
            res.status(401).send("Incorrect user credentials!!")
        }

        const token = Jwt.sign({
            id:user._id
        },
        "mySecretKey",
        {expiresIn: "5h"})

        const options= {
            expires: new Date(Date.now() +3 *24*60*60*1000),
            httpOnly: true
        }
        user.password=undefined
        user.token=token
        res.status(201).cookie("token", token, options).json({
            success:true,
            token,
            user
        })

    } catch(err){
        console.log(err.message)
    }
})

app.get('/profile',auth, async  (req, res)=>{    
    // console.log(req.user.id)
    const user = await TestUser.findById(req.user.id)
    if(!user){
        res.status(400).send("Please login first.")
    }
    res.status(201).send(`Welcome : ${user.firstname}`)
})

app.post('/upload', auth, upload.single('uploaded_file'),async (req, res)=>{
    console.log(req.file.filename)
    if(!req.file.filename){
        res.status(500).send("Upload failed!!")
    }
    res.status(200).json({
        success:true,
        message:"upload successfully",
        file:req.file
    })
    
} )

app.get('/logout', (req, res)=>{
    res.clearCookie('token').send("Logout successfully!")
})


app.listen(5000,()=>{
    console.log('App running at port 5000.')
} )

