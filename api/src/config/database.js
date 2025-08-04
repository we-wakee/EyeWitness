const mongoose = require('mongoose')

const connectDB = async ()=>{
    console.log("Connecting to database...")
    await mongoose.connect(process.env.MONGODB_URI)
}

module.exports = connectDB;