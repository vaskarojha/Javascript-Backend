import mongoose from "mongoose";

import { DB_NAME } from "../constants.js";

const connect_db = async()=>{
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(`Mongo DB connected. DB_HOST : ${connectionInstance.connection.host}`)
    }
    catch(err){
        console.log("DB connection error:")
        // process.exit(1)
    }
}

export default connect_db