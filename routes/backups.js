const express = require('express');
const router = express.Router();
const controller = require('../controllers/backups');

router.get('/', controller.list);

module.exports = router;
