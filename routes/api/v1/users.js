const express = require('express');

const router = express.Router();
const usersApi= require('../../../controllers/api/v1/users_api');

router.use('/posts',require('./posts'));
router.post('/create-session', usersApi.createSession); //'false' is set so that session cookie is not created
module.exports= router;