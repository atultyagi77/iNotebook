require('dotenv').config()
var cors = require('cors')
const connectDB = require('./db');
//const PORT = process.env.PORT || 3500
connectDB();
console.log(process.env.NODE_ENV)

const express = require('express')
const app = express()
const port = 5000
app.use(cors())
app.use(express.json())

//available routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`iNotebook backend mongoose app listening on port ${port}`)
})

