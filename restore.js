require('dotenv').config()
const AWS = require('aws-sdk');
const async = require('async');
const fs = require('fs');
const execSync = require('child_process').execSync;
const default_path = 'restores/'

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_ACCESS_SECRET
});

const execute = function (path) {
  let command = `sudo /opt/couchbase/bin/cbrestore ${default_path + path} couchbase://${process.env.DB_HOST}:8091 -u ${process.env.DB_USER} -p '${process.env.DB_PASSWORD}' -b ${process.env.DB_BUCKET}`
  code = execSync(command, { encoding: 'utf8', maxBuffer: 50 * 1024 * 1024 });
  console.log('restored')
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

  const s3 = new AWS.S3();
  s3.listObjects(params, function (err, data) {
    if (err) return console.log(err);

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

          let full_path = default_path + key
          // create folder path if not exists
          full_path.split('/').slice(0, -1).reduce((last, folder) => {
            let folderPath = last ? (last + '/' + folder) : folder
            if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath)
            return folderPath
          })

          fs.writeFileSync(default_path + key, contents);
          callback();
        }
      });
    }, function (err) {
      if (err) {
        console.log('Failed: ' + err);
      } else {
        console.log('Finished download');
        execute('2019-11-01T130855Z');
      }
    });
  });
}

// listBackups('backup-couchbase-tests')
syncBackup('2019-11-01T130855Z', 'backup-couchbase-tests')
