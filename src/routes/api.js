const express = require('express');
const router = express.Router({});
const asyncMiddleware = require('../utils/asyncMiddleware');
const {Glue} = require('aws-sdk');

const glue = new Glue();

router.get('/', asyncMiddleware(async (req, res) => {
  const databases = await glue.getDatabases().promise();
  res.json(databases);
}));

module.exports = router;
