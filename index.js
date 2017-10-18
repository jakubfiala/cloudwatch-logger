/**
 * CLOUDWATCH LOGGER
 * =============
 */
const getCloudWatchLogs = require('./cloudwatch-logs.js');

class Logger {
  constructor(config) {
    this.CloudWatchLogs = getCloudWatchLogs(config);
    this.logGroupName = config.logGroupName;
    this.logStreamName = config.logStreamName;
    this.sequenceToken = null;
  }

  // creates a new CloudWatch log stream asynchronously and returns `this`
  async connect() {
    const streamParams = {
      logStreamName: this.logStreamName,
      logGroupName: this.logGroupName
    };

    const responseHandler = (resolve, reject) => (err, data) => {
      if (err) {
        reject(err);
      }
      else {
        resolve(this);
      }
    };

    return new Promise((resolve, reject) => {
      this.CloudWatchLogs.createLogStream(streamParams, responseHandler(resolve, reject));
    });
  }

  // sends JSON-encoded arguments as individual log events to the CW log
  async log(...messages) {
    const logEvents = messages.map(m => {
      return {
        message: JSON.stringify(m),
        timestamp: Date.now()
      }
    });

    const streamParams = {
      logEvents,
      sequenceToken: this.sequenceToken,
      logStreamName: this.logStreamName,
      logGroupName: this.logGroupName
    };

    const responseHandler = (resolve, reject) => (err, data) => {
      if (err) {
        reject(err);
      } else {
        this.sequenceToken = data.nextSequenceToken;
        resolve(data);
      }
    };

    return new Promise((resolve,reject) => {
      this.CloudWatchLogs.putLogEvents(streamParams, responseHandler(resolve, reject));
    });
  }

  getAWSObject() {
    return this.CloudWatchLogs;
  }
};

module.exports = Logger;
