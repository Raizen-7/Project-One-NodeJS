const express = require('express');
const { json } = require('sequelize');

const app = express();

app.use(express.json());

module.exports = { app };