const mongoose = require('mongoose')
const UserSchema= new mongoose.Schema({
    name:{ type: String, required: true},
    age:Number,
    comments:[{
        user:String,
        rating:Number,
    }],
    date:{type:Date, default: Date.now},
    hidden:{type:Boolean, default: true}
})

const UserModel= mongoose.model('User',UserSchema)

module.exports=UserModel

