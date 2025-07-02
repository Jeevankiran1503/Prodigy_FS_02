const mongoose = require("mongoose")
const express = require("express")
const cors = require("cors")
require('dotenv').config();

const app = express()

app.use(express.json())

app.use(cors({
  origin: 'http://localhost:5173', // or '*' for all origins (not safe in production)
  credentials: true
}));


const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("MongoDB connected")
}).catch((err)=> console.log(err))


app.use('/api/auth', require('./Routes/auth'));
app.use('/api/employees', require('./Routes/employee'));

app.use('/', (req, res) => {
    res.json({ message: "hello" });
});

app.listen(PORT,()=>{
    console.log(`server started at ${PORT}`)
})