const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');

router.get('/',homeController.home); // here 127.0.0.1:8000/ gets executed
router.use('/users', require('./users')); // here any other link which has /users will be passed. eg. 127.0.0.1:8000/users/profile
router.use('/posts', require('./posts'));
router.use('/comments', require('./comments'));
router.use('/api',require('./api'));
router.use('/likes', require('./likes'));
module.exports =router;
