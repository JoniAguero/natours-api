const express = require('express');

const router = express.Router();
const controller = require('../controllers/users');

router.route('/')
  .get(controller.getUsers)

router.route('/:id')
  .get(controller.getUserById)
  .patch(controller.patchUser)
  .delete(controller.deleteUser)

module.exports = router;