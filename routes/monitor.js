const express = require('express');
const router = express.Router();
const controller = require('../controllers/monitor');

router.get('/', controller.monitor);

module.exports = router;
