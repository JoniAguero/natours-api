const express = require('express');

const router = express.Router({ mergeParams: true });
const controller = require('../controllers/review');
// const authController = require('../controllers/auth');

router.route('/')
  .get(controller.getAllReviews)
  .post(
    // authController.protect,
    // authController.restricTo('user'),
    controller.createReview)

module.exports = router;