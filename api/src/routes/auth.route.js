const express = require('express');
const { protectRoute } = require('@middleware/auth.middleware.js');
const { login, logout, signup, update } = require('@controller/auth.controller.js');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.put('/update', protectRoute, update);

module.exports = router;
