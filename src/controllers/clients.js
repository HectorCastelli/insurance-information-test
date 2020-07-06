const express = require('express');
const router = new express.Router();

const { validate, Joi } = require('express-validation');
const Clientservice = require('../services/clients');
const clientservice = new Clientservice();

const { authenticationMiddleware } = require('../middleware/authentication');

const clientsearchValidation = {
  body: Joi.object({
    ids: Joi.array().items(Joi.string()).optional(),
    names: Joi.array().items(Joi.string()).optional(),
  }),
};

router.get('/', authenticationMiddleware('user', 'admin'), validate(clientsearchValidation), (req, res) => {
  const searchParameters = req.body;
  const results = {
    'clients': [],
  };
  if (searchParameters.ids) {
    clientservice.searchByID(...searchParameters.ids).forEach((client) => {
      results.clients.push(client);
    });
  }
  if (searchParameters.names) {
    clientservice.searchByName(...searchParameters.names).forEach((client) => {
      results.clients.push(client);
    });
  }
  if (results.clients.length > 0) {
    results.clients = Array.from(new Set(results.clients).values());
    res.send(results);
  } else {
    res.status(404).send({ message: `No Clients found that match the parameters: ${searchParameters}` });
  }
});

router.get('/:id/', authenticationMiddleware('user', 'admin'), (req, res) => {
  const clientId = req.params.id;
  const client = clientservice.searchByID(clientId).pop();
  if (client) {
    res.send(client);
  } else {
    res.status(404).send({ message: `No Clients found with the ID: ${clientId}` });
  }
});

module.exports = router;
