const express = require('express');
const passport=require('passport');
const router = express.Router();
const usersController = require('../controllers/users_controller');

router.get('/profile/:id',passport.checkAuthentication,usersController.profile); // here 127.0.0.1:8000/users/profile gets executed
router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);
router.post('/create', usersController.create);
router.post('/update/:id', passport.checkAuthentication, usersController.update);

//use passport as a middle to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'}
), usersController.createSession);
// console.log("hi");

router.get('/sign-out', usersController.destroySession);
module.exports= router;