const mongoose = require('mongoose')

const connectDB = async ()=>{
    console.log()
    await mongoose.connect(process.env.MONGO_URI)
}

module.exports = connectDB;