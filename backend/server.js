require('dotenv').config();

const express = require('express');
const workoutrouter = require('./routes/workout');
const mongoose = require('mongoose');
const cors = require('cors');
//routes
const app = express()
const corsoption = {
    origin:['http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE' , 'PATCH'] // Allow these methods
}

app.use(cors(corsoption));
app.use(express.json());

app.use('/api/workout',workoutrouter);

console.log(process.env.PORT)

const connectDatabase = async ()=>{
    try {
        const connected = await mongoose.connect(process.env.URI);
        if(!connected){
            throw new Error ("error inconnecting to the database")
        }
        app.listen(process.env.PORT,()=>console.log("database connected and server has started on port",process.env.PORT));  
    } catch (error) {
        console.log("error occured ",error)
    }
}
connectDatabase();