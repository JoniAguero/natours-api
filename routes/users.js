const express = require('express');

const router = express.Router();
const controller = require('../controllers/users');
const authController = require('../controllers/auth');

// Protect all routes after this middleware
router.use(authController.protect)
// 

router.get('/me', authController.me, controller.getUserById)

router.route('/')
  .get(controller.getUsers)

router.route('/:id')
  .get(controller.getUserById)
  .patch(controller.updateUser)
  .delete(controller.deleteUser)

router.route('/update-current-user')
  .patch(controller.updateCurrentUser)

router.route('/delete-current-user')
  .delete(controller.inactiveCurrentUser) 

module.exports = router;