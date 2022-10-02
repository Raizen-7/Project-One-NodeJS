const express = require('express');
const { userRouter } = require('./routes/user.routes')

const app = express();

app.use(express.json());

//Define endpoints
app.use('/api/v1/users', userRouter);
app.use('/api/v1/restaurants', )

module.exports = { app };