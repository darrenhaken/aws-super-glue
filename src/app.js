const express = require('express');
const handlers = require('./config/handlers');
const {initAws} = require('./config/aws');

const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');

initAws();

const app = express();
app.use(handlers);
app.use('/', indexRouter);
app.use('/api', apiRouter);

module.exports = app;
