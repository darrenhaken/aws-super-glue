const express = require('express');
const router = express.Router({});
const {Glue} = require('aws-sdk');

const Database = require('../model/database');
const asyncMiddleware = require('../utils/asyncMiddleware');
const logger = require('../utils/logger');

const glue = new Glue();

router.get('/', asyncMiddleware(async (req, res) => {
  logger.debug('Get AWS Glue databases');
  const databaseResponse = await glue.getDatabases().promise();
  const dbPromises = databaseResponse.DatabaseList.map(async db => {
    const tables = await glue.getTables({DatabaseName: db.Name}).promise();
    return new Database(db.Name, tables);
  });
  const dbs = await Promise.all(dbPromises);
  res.json(dbs);
}));

module.exports = router;
