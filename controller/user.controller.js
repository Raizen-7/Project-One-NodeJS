const jwr = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

//Models
const { User } = require('../models/user.model');

//Utils
const { AppError } = require('../utils/appError.util');
const { catchAsync } = require('../utils/catchAsync.util');

dotenv.config({ path: './config.env' });

const getAllOrders = catchAsync(async (req, res, next) => {});

const createOrder = catchAsync(async (req, res, next) => {});

const updateOrder = catchAsync(async (req, res, next) => {});

const deleteOrder = catchAsync(async (req, res, next) => {});

const login = catchAsync(async(req, res, next) => { });

module.exports={
    getAllOrders,
    createUser,
    updateUser,
    deleteUser,
    login,
};
