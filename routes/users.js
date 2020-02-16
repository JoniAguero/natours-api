const express = require('express');
const router = express.Router();
const controller = require('../controllers/users');

router.param('id', controller.checkIfExists)

router.route('/')
  .get(controller.getUsers)
  .post(controller.createUser)

router.route('/:id')
  .get(controller.getUserById)
  .patch(controller.patchUser)
  .delete(controller.deleteUser)

module.exports = router;