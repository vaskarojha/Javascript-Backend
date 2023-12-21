import express, { response } from "express"
//IMPORTING LIBRARY CALLED MONGOOSE TO WORK WITH MONGODB DATABASE
import mongoose from 'mongoose'
import cors from 'cors'
//IMPORING THE VARIABLE THAT HAVE BEEN CREATED ON CONFIG.JS FILE IN SAME DIRECTORY
import { PORT, DBURL } from "./config.js"
//IMPORTING THE USER MODEL
import { User } from "./models/user.model.js"


// INSTANCIATING THE EXPRESS IN APP VARIABLE.
const app = express()

// to parse the data into json object
app.use(express.json())


// use CORS to rectify the cross origin issue
app.use(cors())

app.get('/', (req, res)=>{
    console.log(req)
    return response.status(200).send("Hello!!")
})

app.post('/users', async (req, res)=>{
    try{
        if(!req.body.name ||
            !req.body.address||
            !req.body.age){
                return res.status(400).send({
                    message: "Missing paramaters name or address or age"
                })
            }
        const newUser = {
            name: req.body.name,
            address: req.body.address,
            age: req.body.age
        }

        const user= await User.create(newUser);
        return res.status(201).send(user)
    } catch(error){
        console.log(error.message)
        res.status(500).send({message:error.message})
    }
})


//Getting all users from database

app.get('/users', async(req, res)=>{
    try{
        const users = await User.find({})
        return res.status(200).json({
            count:users.length,
            data: users
        });
    } catch(error){
        console.log(error.message);
        res.status(500).send({message: error.message})
    }
})


// get user from db by an id
app.get('/users/:id', async(req, res)=>{
    try{
        const {id} = req.params

        const user = await User.findById(id)

        const users = await User.find({})
        return res.status(200).json(user);
    } catch(error){
        console.log(error.message);
        res.status(500).send({message: error.message})
    }
})


app.put('/users/:id', async (req,res)=>{
    try{
        if(!req.body.name || !req.body.address|| !req.body.age){
                return res.status(400).send({
                    message: "Missing paramaters name or address or age"
                })
                }
        const {id} = req.params;
        const result = await User.findByIdAndUpdate(id, req.body);

        if(!result){
            return res.status(400).json({message: "User not found"});
        }
        return res.status(200).send({message: "User updation successfull!!"});
    }catch(error){
        console.log(error.message)
        res.status(500).send({message: error.message})
    }
})


// delete user from db
app.delete('/users/:id', async (req, res)=>{
    try{
        const {id} = req.params

        const result = await User.findByIdAndDelete(id);
        if(!result){
            return res.status(404).json({message: "User not found!!"})
        }
        return res.status(200).send({message: "User deleted successfully!!"})
    }catch(error){
        console.log(error.message)
    }
})

//CONNECTION OF BACKEND LOCAL SYSTEM TO ONLINE MONGODB DATABASE.
mongoose.connect(DBURL)
.then(()=>{
    console.log('DB connected successfully');
    app.listen(PORT, ()=>{
        console.log(`Application listening to port: ${PORT}`)
    });
}).catch((error)=>{
    console.log(error)
});