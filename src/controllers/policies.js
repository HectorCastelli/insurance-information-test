const express = require('express');
const router = new express.Router();

router.get('/', (req, res) => {
  res.send('Policies Endpoint');
});

router.get('/:id/', (req, res) => {
  res.send('Policies Endpoint with specific ID');
});

module.exports = router;
