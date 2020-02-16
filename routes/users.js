const express = require('express');
const router = express.Router();

const getUsers = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      message: 'TO-DO'
    }
  })
};

const getUserById = (req, res) => {
  const tour = tours.find(el => el.id === req.params.id)
  if(!tour) {
    return res.status(404).json({
      status: 'Error',
      data: {
        tour: 'User not found'
      }
    })
  }
  res.status(200).json({
    status: 'success',
    data: {
      message: 'TO-DO'
    }
  })
};

const patchUser = (req, res) => {
  const tour = tours.find(el => el.id === req.params.id)
  if(!tour) {
    return res.status(404).json({
      status: 'Error',
      data: {
        tour: 'User not found'
      }
    })
  }
  res.status(200).json({
    status: 'success',
    data: {
      message: 'TO-DO'
    }
  })
};

const deleteUser = (req, res) => {
  const tour = tours.find(el => el.id === req.params.id)
  if(!tour) {
    return res.status(404).json({
      status: 'Error',
      data: {
        tour: 'User not found'
      }
    })
  }
  res.status(200).json({
    status: 'success',
    data: {
      message: 'TO-DO'
    }
  })
};

const createUser = (req, res) => {
  const newId = tours.length + 1;
  const newUser = Object.assign({ id: newId }, req.body);
  tours.push(newUser);
  fs.writeFile(`${__dirname}/dev-data/data/tours.json`, JSON.stringify(tours), err => {
    res.status
  })
  res.status(200).json({
    status: 'success',
    message: 'TO-DO'
  })
};

router.route('/')
  .get(getUsers)
  .post(createUser)

router.route('/:id')
  .get(getUserById)
  .patch(patchUser)
  .delete(deleteUser)

module.exports = router;