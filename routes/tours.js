const express = require('express');
// const authController = require('../controllers/auth');
const reviewsRouter = require('./reviews');



const router = express.Router();
const controller = require('../controllers/tours');

// Use reviews-routes
router.use('/:tourId/reviews', reviewsRouter);

// Example 5 tours cheaper
router.route('/top-5-cheap')
  .get(controller.top5Cheap, controller.getTours)

router.route('/tours-stats')
  .get(controller.getTourStats)

router.route('/monthly-plan/:year')
  .get(controller.getMonthlyPlan)


router.route('/')
  .get(controller.getTours)
  .post(controller.createTour)

router.route('/:id')
  .get(controller.getTourById)
  .patch(controller.updateTour)
  .delete(
    // authController.protect,
    // authController.restricTo('admin', 'lead-guide'),
    controller.deleteTour
  )

module.exports = router;