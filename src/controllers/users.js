const express = require('express');
const router = new express.Router();

const { validate, Joi } = require('express-validation');
const UserService = require('../services/users');
const userService = new UserService();

const { authenticationMiddleware } = require('../middleware/authentication');

const userSearchValidation = {
  body: Joi.object({
    ids: Joi.array().items(Joi.string()).optional(),
    names: Joi.array().items(Joi.string()).optional(),
  }),
};

router.get('/', authenticationMiddleware('user', 'admin'), validate(userSearchValidation), (req, res) => {
  const searchParameters = req.body;
  const results = {
    'clients': [],
  };
  if (searchParameters.ids) {
    userService.searchByID(...searchParameters.ids).forEach((user) => {
      results.clients.push(user);
    });
  }
  if (searchParameters.names) {
    userService.searchByName(...searchParameters.names).forEach((user) => {
      results.clients.push(user);
    });
  }
  if (results.clients.length > 0) {
    results.clients = Array.from(new Set(results.clients).values());
    res.send(results);
  } else {
    res.status(404).send({ message: `No Users found that match the parameters: ${searchParameters}` });
  }
});

router.get('/:id/', authenticationMiddleware('user', 'admin'), (req, res) => {
  const userId = req.params.id;
  const user = userService.searchByID(userId).pop();
  if (user) {
    res.send(user);
  } else {
    res.status(404).send({ message: `No Users found with the ID: ${userId}` });
  }
});

module.exports = router;
