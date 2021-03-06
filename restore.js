require('dotenv').config()
const AWS = require('aws-sdk');
const async = require('async');
const fs = require('fs');
const execSync = require('child_process').execSync;
const default_path = 'restores/'
const instance = require('./util/instance')
const axios = require('axios')

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_ACCESS_SECRET
});

const execute = function (path) {
  fs.readdirSync(default_path + path).forEach(function (name) {
    if (name.indexOf('full') > -1) {
      console.log('fullbackup', name)
      let command = `sudo /opt/couchbase/bin/cbrestore ${default_path + path + '/' + name} couchbase://${process.env.DB_HOST}:8091 -u ${process.env.DB_USER} -p '${process.env.DB_PASSWORD}' --bucket-source=${process.env.DB_BUCKET}`
      code = execSync(command, { encoding: 'utf8', maxBuffer: 50 * 1024 * 1024 });
      console.log('restored')
    }
  })

}

async function listBackups(bucket_name = 'backup-couchbase-tests') {
  let s3 = new AWS.S3();
  let params = { Bucket: bucket_name, Delimiter: '/', };

  return new Promise((resolve, reject) => {
    s3.listObjects(params, function (err, data) {
      if(err) console.log(err)
      resolve(data)
    })
  })
}

async function syncBackup(PREFIX, BUCKET) {
  var params = {
    Bucket: BUCKET,
    Prefix: PREFIX
  }

  const s3 = new AWS.S3();

  return new Promise((resolve, reject) => {
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
            var contents = fileContents.Body.toString('utf-8');

            let full_path = default_path + key
            // create folder path if not exists
            full_path.split('/').slice(0, -1).reduce((last, folder) => {
              let folderPath = last ? (last + '/' + folder) : folder
              if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath)
              return folderPath
            })

            fs.writeFileSync(default_path + key, contents, { mode: 0777 });
            callback();
          }
        });
      }, function (err) {
        if (err) {
          console.log('Failed: ' + err);
        } else {
          console.log('Finished download');
          execute(PREFIX);
          resolve(true)
        }
      });
    });
  })
}

// listBackups('backup-couchbase-tests')
// syncBackup('2019-11-01T181751Z', 'backup-couchbase-tests')

module.exports = { listBackups, syncBackup };

if (process.argv[1].indexOf('restore.js') > -1) {
  console.log('manual restore')

  listBackups()
    .then(backups => {
      if (process.argv[3])
        instance.createInstance()
          .then(data => {
            axios.post(`http://${data.Instances[0].PrivateIpAddress}:4444/backups`, { name: backups.CommonPrefixes[backups.CommonPrefixes.length - 1].Prefix })
          })

      else if (process.argv[2]) {
        let backup = backups.CommonPrefixes[process.argv[2]]
        console.log('restoring', backup)
        syncBackup(backup.Prefix, process.env.BACKUP_BUCKET)
          .then(data => {
            console.log(data)
          })
      }
      else
        for (let backup of backups.CommonPrefixes) {
          console.log(backup.Prefix)
        }
    })

}
