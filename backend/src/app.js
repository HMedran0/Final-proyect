require('dotenv').config();

const userRouter = require('../routers/userRouter');
const loginRouter = require('../routers/loginRouter');

const express = require('express');
const cors = require('cors');
const app = express();

require('./database');

const PORT = process.env.PORT || 4000;

app.use(cors());

app.use(express.json());

app.use('/user/', userRouter);

app.use('/user/', loginRouter);

app.get('/', (req, res)=>{
    res.json({message:'Working'})
})

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
})




