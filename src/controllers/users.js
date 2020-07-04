const express = require('express');
const router = new express.Router();

router.get('/', (req, res) => {
  res.send('Users Endpoint');
});

router.get('/:id/', (req, res) => {
  res.send('Users Endpoint with specific ID');
});

module.exports = router;
