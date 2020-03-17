const express = require('express');

const router = express.Router();
const controller = require('../controllers/users');
const authController = require('../controllers/auth');

router.route('/')
  .get(controller.getUsers)

router.route('/:id')
  .get(controller.getUserById)
  .patch(controller.updateUser)
  .delete(controller.deleteUser)

router.route('/update-current-user')
  .patch(
    authController.protect,
    controller.updateCurrentUser
  )

router.route('/delete-current-user')
  .delete(
    authController.protect,
    controller.inactiveCurrentUser
  )

module.exports = router;