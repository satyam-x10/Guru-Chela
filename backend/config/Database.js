import mongoose from "mongoose";

export const connectDB = async() => {
    
    // const db = process.env.MONGO_URI
    const db = "mongodb+srv://satyam:nJNgOP79GpiwgwKj@Guru-Chela.rmdqnwb.mongodb.net/?retryWrites=true&w=majority&appName=Guru-Chela"

    const {connection} = await mongoose.connect(db, { useNewUrlParser: true });

    console.log(`MongoDB Connected to ${connection.host}`);


}