const mongoose = require("mongoose");
mongoose.set("strictQuery",false);
const connectDb = async()=>{
    try{
        const connect = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Database connected successfully ${connect.connection.host}`);
    }
    catch(error){
        console.log(error);
    }
}

module.exports = connectDb