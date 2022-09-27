const jwr = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

//Models
const { User } = require('../models/user.model');

//Utils
const { AppError } = require('../utils/appError.util');
const { catchAsync } = require('../utils/catchAsync.util');

dotenv.config({ path: './config.env' });

const getAllUsers = catchAsync(async (req, res, next) => {});

const createUser = catchAsync(async (req, res, next) => {});

const updateUser = catchAsync(async (req, res, next) => {});

const deleteUser = catchAsync(async (req, res, next) => {});

const login = catchAsync(async(req, res, next) => { });

module.exports={
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    login,
};
