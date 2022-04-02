const express = require('express');
const passport=require('passport');
const router = express.Router();
const friendshipsController = require('../controllers/friendships_controller');

router.post('/add-friend/:friend_id', friendshipsController.addFriend);
router.post('/remove-friend/:friend_id', friendshipsController.removeFriend);
module.exports= router;