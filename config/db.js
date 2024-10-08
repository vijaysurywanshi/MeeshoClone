import mongoose from "mongoose";

const connectDB = async ()=> {
    try {
        const conn= await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB Connected to : ${conn.connection.host} -----------`);
        console.log('Connection Details:', {
            host: conn.connection.host,
            port: `${conn.connection.port}--- this is default port of mongodb`,
            databaseName: conn.connection.name ,
            readyState: conn.connection.readyState,
            
        });
        
    } catch (error) {
        console.log("Error in connection with database in file DB.JS", error); 
        
    }
}

export default connectDB; //dont call it like connectDB()

