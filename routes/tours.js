const express = require('express');

const router = express.Router();
const controller = require('../controllers/tours');

router.route('/')
  .get(controller.getTours)
  .post(controller.createTour)

router.route('/:id')
  .get(controller.getTourById)
  .patch(controller.patchTour)
  .delete(controller.deleteTour)

module.exports = router;