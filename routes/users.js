const express = require('express');

const router = express.Router();
const usersController = require('../controllers/users_controller');

router.get('/profile',usersController.profile); // here 127.0.0.1:8000/users/profile gets executed
router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);
router.post('/create', usersController.create);

console.log("hi");
module.exports= router;