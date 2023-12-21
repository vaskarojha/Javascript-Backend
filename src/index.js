import dotenv from "dotenv"
import connect_db from "./db/index.js";
import app from './app.js';

dotenv.config({
    path:'./env'
})

connect_db()
.then(()=>{
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`Server running at port: ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("Error durring DB connection: ", err)
})

/*
import { express } from "express";
const app = express()
// const connect_db = ()=>{

// }

// connect_db()

;(async ()=>{
    try{
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        app.on("error", (error)=>{
            console.log("Error:", error);
            throw error
        })
        app.listen(process.env.PORT, ()=>{
            console.log(`App listening on port ${process.env.PORT}`)
        })
        
    }
    catch(error){
        console.log(error)
    }
})()
*/