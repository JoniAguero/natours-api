const express = require('express');

const router = express.Router();
const controller = require('../controllers/auth');

router.post('/signup', controller.signup)

module.exports = router;