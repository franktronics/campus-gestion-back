const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user')
const masterRoutes = require('./routes/master')
const scheduleRoutes = require('./routes/schedule')
require('dotenv').config({path: '.env'})

const CONNECT = process.env.DB_CONNECT
mongoose.connect(CONNECT,
{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connect to MongoDB'))
  .catch((error) => console.log('Error to connect MongoDB', error))


const app = express();
app.use(express.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/user', userRoutes)
app.use('/master', masterRoutes)
app.use('/schedule', scheduleRoutes)
app.get('/', (req, res) => { res.json({msg: 'Hello server!'})})


module.exports = app;