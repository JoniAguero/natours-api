const express = require('express');

const router = express.Router();
const controller = require('../controllers/users');
const authController = require('../controllers/auth');

router.route('/')
  .get(controller.getUsers)

router.route('/:id')
  .get(controller.getUserById)
  .patch(controller.patchUser)
  .delete(controller.deleteUser)

  router.route('/update-current-user')
  .patch(authController.protect, controller.updateCurrentUser)

module.exports = router;