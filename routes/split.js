const express = require('express');
const router = express.Router();
const splitCalc = require('./splitCalc');

const getSplit = (req, res) => {
  const result = splitCalc(req.body);
  res.status(200).json(result);
}

router.post('/compute', getSplit);

module.exports = router;