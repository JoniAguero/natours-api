const getUsers = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      message: 'TO-DO'
    }
  })
};

const getUserById = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      message: 'TO-DO'
    }
  })
};

const patchUser = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      message: 'TO-DO'
    }
  })
};

const deleteUser = (req, res) => {
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

const checkIfExists = (req, res, next) => {
  const user = users.find(el => el.id === req.params.id)
  if(!user) {
    return res.status(404).json({
      status: 'Error',
      data: {
        user: 'Invalid ID'
      }
    })
  }
  next();
};

module.exports = {
  getUsers,
  getUserById,
  patchUser,
  deleteUser,
  createUser,
  checkIfExists
}