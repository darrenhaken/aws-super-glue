const express = require('express');
const router = express.Router({});
const {Glue} = require('aws-sdk');
const Database = require('../model/database');
const Table = require('../model/table');
const asyncMiddleware = require('../utils/asyncMiddleware');
const logger = require('../utils/logger');

const glue = new Glue();

router.get('/', asyncMiddleware(async (req, res) => {
  logger.debug('Get Glue databases from AWS');
  const databaseResponse = await glue.getDatabases().promise();
  const dbs = await createDatabases(databaseResponse);
  logger.debug('Processed Glue Databases');
  res.json(dbs);
}));

async function createDatabases(glueDbResponse) {
  const dbPromises = glueDbResponse.DatabaseList.map(async db => {
    const tablesResponse = await glue.getTables({DatabaseName: db.Name}).promise();
    const tables = tablesResponse.TableList.map(table => new Table(table.Name, table.StorageDescriptor.Columns));
    return new Database(db.Name, tables);
  });
  return Promise.all(dbPromises);
}

module.exports = router;
