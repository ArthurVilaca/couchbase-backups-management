const backup = require('../backup');
const restore = require('../restore');

async function list(req, res, next) {
  restore.listBackups()
    .then(data => {
      res.json(data)
    })
    .catch(error => {
      {
        console.log(error)
        res.json([])
      }
    })
}

module.exports = { list };
