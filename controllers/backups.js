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

async function execute(req, res, next) {
  await restore.syncBackup(req.body.name, process.env.BACKUP_BUCKET)
  res.json({ valid: true })
}

module.exports = { list, execute };
