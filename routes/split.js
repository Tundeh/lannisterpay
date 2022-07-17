const express = require('express');
const router = express.Router();
const splitCalc = require('./splitCalc');
const data = {
  "ID": 13082,
  "Balance": 1750,
  "SplitBreakdown": [
      {
          "SplitEntityId": "LNPYACC0019",
          "Amount": 450
      },
      {
          "SplitEntityId": "LNPYACC0011",
          "Amount": 2300
      }
  ]
}
const getSplit = (req, res) => {
  const {ID, Amount, SplitInfo} = req.body;
  const result = splitCalc(req.body);
  res.status(200).json(result);
}

router.post('/compute', getSplit);

module.exports = router;