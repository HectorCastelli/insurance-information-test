const express = require('express');
const router = new express.Router();

router.post('/', (req, res) => {
  res.send('Authentication Endpoint');
});

module.exports = router;
