const aws = require('aws-sdk');

const getCloudWatchLogs = ({ accessKeyId, secretAccessKey, region, sessionToken = null }) => new aws.CloudWatchLogs({
  apiVersion: '2014-03-28',
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
    sessionToken
  }
});

module.exports = getCloudWatchLogs;
