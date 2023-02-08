const mongoose = require('mongoose');

mongoose.set("strictQuery", false);
const connectDB = async () => {
    try{
        await   mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true })
        console.log('MongoDB connected')
    } catch (err){
        console.log(err)
    }

}

module.exports = connectDB