const aws = require('aws-sdk');

const getCloudWatchLogs = ({ accessKeyId, secretAccessKey, region }) => new aws.CloudWatchLogs({
  apiVersion: '2014-03-28',
  region,
  credentials: {
    accessKeyId,
    secretAccessKey
  }
});

module.exports = getCloudWatchLogs;
