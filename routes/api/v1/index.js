const express = require('express');

const router = express.Router();

router.use('/posts',require('./posts'));
router.use('/users', require('./users.js'));
module.exports= router;