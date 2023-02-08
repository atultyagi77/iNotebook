require('dotenv').config()

const connectDB = require('./db');
const PORT = process.env.PORT || 3500
connectDB();
console.log(process.env.NODE_ENV)
console.log("hello");

