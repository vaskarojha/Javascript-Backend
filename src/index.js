import dotenv from "dotenv"
import connect_db from "./db/index.js";

dotenv.config({
    path:'./env'
})

connect_db()

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