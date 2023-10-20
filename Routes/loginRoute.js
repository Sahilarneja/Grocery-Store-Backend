const express = require('express');
const { registerController , loginController} = require('../Controllers/loginController');
const loginRoute = express.Router();

loginRoute.post('/register', registerController);
loginRoute.post('/login', loginController);

module.exports = loginRoute;
