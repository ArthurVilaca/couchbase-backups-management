const express = require('express');
const rootRouter = express.Router();

const monitor = require('./monitor');
const backups = require('./backups');

rootRouter.get('/', function (req, res, next) {
  res.send('it works');
});

rootRouter.use('/monitor', monitor);
rootRouter.use('/backups', backups);

module.exports = rootRouter;
