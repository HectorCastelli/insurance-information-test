const express = require('express');
const router = new express.Router();

const { validate, Joi } = require('express-validation');
const PolicyService = require('../services/policies');
const policyService = new PolicyService();

const { authenticationMiddleware } = require('../middleware/authentication');

const policySearchValidation = {
  body: Joi.object({
    clients: Joi.array().items(Joi.string()).optional(),
    advisors: Joi.array().items(Joi.string()).optional(),
  }),
};

router.get('/', authenticationMiddleware('admin'), validate(policySearchValidation), (req, res) => {
  const searchParameters = req.body;
  const results = {
    'policies': [],
  };
  if (searchParameters.clients) {
    policyService.searchByUserID(...searchParameters.clients).forEach((policy) => {
      results.policies.push(policy);
    });
  }
  if (searchParameters.advisors) {
    policyService.searchByAdvisorEmail(...searchParameters.advisors).forEach((policy) => {
      results.policies.push(policy);
    });
  }
  if (results.policies.length > 0) {
    results.policies = Array.from(new Set(results.policies).values());
    res.send(results);
  } else {
    res.status(404).send({ message: `No Policies found that match the parameters: ${JSON.stringify(searchParameters)}` });
  }
});

router.get('/:id/', authenticationMiddleware('admin'), (req, res) => {
  const policyId = req.params.id;
  const policy = policyService.searchByID(policyId).pop();
  if (policy) {
    res.send(policy);
  } else {
    res.status(404).send({ message: `No Policies found with the ID: ${policyId}` });
  }
});

module.exports = router;
