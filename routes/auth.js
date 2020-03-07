const express = require('express');

const router = express.Router();
const controller = require('../controllers/auth');

router.post('/signup', controller.signup);
router.post('/login', controller.login);

router.post('/forgot-password', controller.forgotPassword);
router.patch('/reset-passwor/:token', controller.resetPassword);
router.patch('/update-password/:token', controller.protect, controller.updatePassword);

module.exports = router;