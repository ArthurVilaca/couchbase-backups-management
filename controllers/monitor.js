const monitoring = require('../monitoring');

async function monitor(req, res, next) {
  res.json(await monitoring.monitor())
}

module.exports = { monitor };
