require('dotenv').config()
const fs = require('fs');
const AWS = require('aws-sdk');
const path = require("path");
const execSync = require('child_process').execSync;

const full_backup = `sudo /opt/couchbase/bin/cbbackup couchbase://${process.env.DB_HOST}:8091 ./backup-events -m full --single-node -u ${process.env.DB_USER} -p '${process.env.DB_PASSWORD}' -b ${process.env.DB_BUCKET}`
const incremental_backup = `sudo /opt/couchbase/bin/cbbackup couchbase://${process.env.DB_HOST}:8091 ./backup-events --mode=diff --single-node -u ${process.env.DB_USER} -p '${process.env.DB_PASSWORD}' -b ${process.env.DB_BUCKET}`

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_ACCESS_SECRET
});

async function execute(type = 'full') {
  code = execSync(incremental_backup, { encoding: 'utf8', maxBuffer: 50 * 1024 * 1024 });
}

async function uploadDir(s3Path, bucketName) {
  let s3 = new AWS.S3();
  function walkSync(currentDirPath, callback) {
    fs.readdirSync(currentDirPath).forEach(function (name) {
      var filePath = path.join(currentDirPath, name);
      var stat = fs.statSync(filePath);
      if (stat.isFile()) {
        callback(filePath, stat);
      } else if (stat.isDirectory()) {
        walkSync(filePath, callback);
      }
    });
  }

  walkSync(s3Path, function (filePath, stat) {
    let bucketPath = filePath.substring(s3Path.length + 1);
    let params = { Bucket: bucketName, Key: bucketPath, Body: fs.readFileSync(filePath) };
    s3.putObject(params, function (err, data) {
      if (err) {
        console.log(err)
      } else {
        console.log('Successfully uploaded ' + bucketPath + ' to ' + bucketName);
      }
    });

  });
};

// execute()
// uploadDir('backup-events', 'backup-couchbase-tests');

module.exports = { execute, uploadDir };
