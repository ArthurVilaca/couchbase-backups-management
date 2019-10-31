require('dotenv').config()
const AWS = require('aws-sdk');
var async = require('async');
var fs = require('fs');

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_ACCESS_SECRET
});

const execute = function () {
  `sudo /opt/couchbase/bin/cbrestore couchbase://${process.env.DB_HOST}:8091 /backup-events -u ${process.env.DB_USER} -p '${process.env.DB_PASSWORD}' -b ${process.env.DB_BUCKET}`
}

const listBackups = function (bucket_name) {
  let s3 = new AWS.S3();
  let params = { Bucket: bucket_name, Delimiter: '/', };

  s3.listObjects(params, function (err, data) {
    console.log(data)
  })
}

const syncBackup = function (PREFIX, BUCKET) {
  var params = {
    Bucket: BUCKET,
    Prefix: PREFIX
  }

  var s3 = new AWS.S3();
  s3.listObjects(params, function (err, data) {
    if (err) return console.log(err);
    console.log(data)

    async.eachSeries(data.Contents, function (fileObj, callback) {
      var key = fileObj.Key;
      console.log('Downloading: ' + key);

      var fileParams = {
        Bucket: BUCKET,
        Key: key
      }

      s3.getObject(fileParams, function (err, fileContents) {
        if (err) {
          callback(err);
        } else {
          // Read the file
          var contents = fileContents.Body.toString();
          console.log(contents)

          // Do something with file

          callback();
        }
      });
    }, function (err) {
      if (err) {
        console.log('Failed: ' + err);
      } else {
        console.log('Finished');
      }
    });
  });
}

// listBackups('backup-couchbase-tests')
syncBackup('2019-10-31T174050Z', 'backup-couchbase-tests')
