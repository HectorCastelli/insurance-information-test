const express = require('express');
const router = new express.Router();
const { validate, Joi } = require('express-validation');
const AuthenticationService = require('../services/authentication');

const authenticationValidation = {
  body: Joi.object({
    email: Joi.string()
      .email()
      .required(),
  }),
};

router.post('/', validate(authenticationValidation), (req, res) => {
  const auth = new AuthenticationService();
  try {
    res.send(auth.authenticate(req.body));
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).send({ message: error.message });
    }
  }
});

module.exports = router;
