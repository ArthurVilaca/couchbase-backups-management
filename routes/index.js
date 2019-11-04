const express = require('express');
const rootRouter = express.Router();

const monitor = require('./monitor');

rootRouter.get('/', function (req, res, next) {
  res.send('it works');
});

rootRouter.use('/monitor', monitor);

module.exports = rootRouter;
