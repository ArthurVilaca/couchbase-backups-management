const AWS = require('aws-sdk');

// Load credentials and set region from JSON file
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_ACCESS_SECRET,
  region: 'us-east-1'
});

// Create EC2 service object
var ec2 = new AWS.EC2({ apiVersion: '2016-11-15' });

var instanceParams = {
  ImageId: process.env.AMI_ID,
  InstanceType: 't2.micro',
  KeyName: process.env.KEY_PAIR_NAME,
  MinCount: 1,
  MaxCount: 1
};

async function createInstance() {
  console.log('creating new instance')
  return new Promise((resolve, reject) => {
    var instancePromise = ec2.runInstances(instanceParams).promise();

    // Handle promise's fulfilled/rejected states
    instancePromise.then(
      (data) => {
        console.log("Created instance", data.Instances[0].InstanceId);
        resolve(data)
      }).catch(
        (err) => {
          console.error(err, err.stack);
          reject(err)
        });
  })
}

module.exports = { createInstance }
