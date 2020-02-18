const express = require('express');

const router = express.Router();
const controller = require('../controllers/tours');

// Example 5 tours cheaper
router.route('/top-5-cheap')
  .get(controller.top5Cheap, controller.getTours)


router.route('/')
  .get(controller.getTours)
  .post(controller.createTour)

router.route('/:id')
  .get(controller.getTourById)
  .patch(controller.patchTour)
  .delete(controller.deleteTour)

module.exports = router;