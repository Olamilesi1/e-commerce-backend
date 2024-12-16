import mongoose from "mongoose";

// connecting to database
export const  dbConnection = () =>{
    return mongoose.connect(process.env.MONGO_URI);
};