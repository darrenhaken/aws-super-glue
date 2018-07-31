const express = require('express');
const router = express.Router({});
const asyncMiddleware = require('../utils/asyncMiddleware');
const logger = require('../utils/logger');
const {Glue} = require('aws-sdk');

const glue = new Glue();

router.get('/', asyncMiddleware(async (req, res) => {
  logger.debug('Get AWS Glue databases');
  const databases = await glue.getDatabases().promise();
  res.json(databases);
}));

module.exports = router;
