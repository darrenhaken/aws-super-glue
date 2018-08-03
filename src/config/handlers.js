const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const express = require('express');

module.exports = [
  logger('dev'),
  express.json(),
  express.urlencoded({extended: false}),
  cookieParser(),
  sassMiddleware({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    indentedSyntax: true, // true = .sass and false = .scss
    sourceMap: true
  }),
  express.static(path.join(__dirname, 'public'))
];
