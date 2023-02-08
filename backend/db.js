// const mongoose = require('mongoose');

// const mongoURI = "mongodb+srv://atultyagi77:Atul2222@cluster0.txkjqwp.mongodb.net/test"


// const connectToMongo = () => {
//     mongoose.connect(mongoURI,  ()=>{
        
//         console.log("Connected to Mongo")
//     })
// }

//module.export = connectToMongo;

const mongoose = require('mongoose');
const PORT = process.env.PORT || 3500

mongoose.set("strictQuery", false);
const connectDB = async () => {
    try{
        await   mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true })
        console.log(`Server running on PORT ${PORT}`)
    } catch (err){
        console.log(err)
    }

}

module.exports = connectDB