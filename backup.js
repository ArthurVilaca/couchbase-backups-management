require('dotenv').config()
const fs = require('fs');
const AWS = require('aws-sdk');
const execSync = require('child_process').execSync;

const full_backup = `sudo /opt/couchbase/bin/cbbackup couchbase://${process.env.DB_HOST}:8091 /backup-events -m full --single-node -u ${process.env.DB_USER} -p '${process.env.DB_PASSWORD}' -b ${process.env.DB_BUCKET}`
const incremental_backup = `sudo /opt/couchbase/bin/cbbackup couchbase://${process.env.DB_HOST}:8091 /backup-events -m diff --single-node -u ${process.env.DB_USER} -p '${process.env.DB_PASSWORD}' -b ${process.env.DB_BUCKET}`

async function execute(type = 'incremental') {

  console.log(`${type}_backup`)
  code = execSync(incremental_backup, { encoding: 'utf8', maxBuffer: 50 * 1024 * 1024 });

  // const fileContent = fs.readFileSync(fileName);

  // // Setting up S3 upload parameters
  // const params = {
  //   Bucket: process.env.S3_BUCKET_NAME,
  //   Key: new Date().toString(),
  //   Body: fileContent
  // };

  // // Uploading files to the bucket
  // s3.upload(params, function (err, data) {
  //   if (err) {
  //     throw err;
  //   }
  //   console.log(`File uploaded successfully. ${data.Location}`);
  // });
}

execute()
