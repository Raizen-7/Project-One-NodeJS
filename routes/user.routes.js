const express = require('express');

//controllers
const { 
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    login,
} = require('../controller/user.controller')
;
//Middleware

const userRouter = express.Router();

userRouter.post('/signup', createUser );

userRouter.post('/login', login);

userRouter.patch('/:id', updateUser);

userRouter.delete('/:id', deleteUser);

userRouter.get('/orders', getAllUsers);

userRouter.get('/orders/:id');

module.exports = { userRouter };