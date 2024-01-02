import dotenv from "dotenv"
import express from 'express'
import connect_db from './db.js'
import { TestUser } from "./model/testUser.js"
import bcrypt from 'bcryptjs'
import { Jwt } from "jsonwebtoken"
import cookieParser from "cookie-parser"

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
        res.status(201).cookie("token", token, options).json({
            success:true,
            token,
            user
        })

    } catch(err){
        console.log(err.message)
    }
})

app.listen(5000,()=>{
    console.log('App running at port 5000.')
} )
