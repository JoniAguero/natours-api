const express = require('express');

const router = express.Router({ mergeParams: true });
const controller = require('../controllers/review');
// const authController = require('../controllers/auth');

router.route('/')
  .get(controller.getAllReviews)
  .post(
    // authController.protect,
    // authController.restricTo('user'),
    controller.setTourUsersId,
    controller.createReview)

router.route('/:id')
  .get(controller.getReviewById)
  .patch(controller.updateReview)
  .delete(
    // authController.protect,
    // authController.restricTo('admin', 'lead-guide'),
    controller.deleteReview
  )

module.exports = router;