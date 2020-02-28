const express = require('express');
const authController = require('../controllers/auth');

const router = express.Router();
const controller = require('../controllers/tours');

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
  .patch(controller.patchTour)
  .delete(
    authController.protect,
    authController.restricTo('admin', 'lead-guide'),
    controller.deleteTour
  )

module.exports = router;