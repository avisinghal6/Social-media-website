const express = require('express');
const passport=require('passport');
const router = express.Router();
const usersController = require('../controllers/users_controller');

router.get('/profile/:id',passport.checkAuthentication,usersController.profile); // here 127.0.0.1:8000/users/profile gets executed
router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);
router.post('/create', usersController.create);
router.post('/update/:id', passport.checkAuthentication, usersController.update);
router.get('/forgot-password', usersController.forgotPassword);


router.post('/create-forgot-password-token', usersController.forgotPasswordToken);
router.get('/reset-password/:token', usersController.resetPassword);
router.post('/check-password', usersController.checkPassword);

//use passport as a middle to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'}
), usersController.createSession);
// console.log("hi");

router.get('/sign-out', usersController.destroySession);
router.get('/auth/google', passport.authenticate('google', {scope: ['profile','email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: 'users/sign-in'}), usersController.createSession);

module.exports= router;