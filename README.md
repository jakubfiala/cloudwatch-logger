# ☁️ 👀 cloudwatch-logger

This AWS CloudWatch logger library is designed to support the use case where apps don't necessarily run continuously, therefore needing to exit after all work has been completed. It is meant to be a thin wrapper around the AWS SDK's `CloudWatchLogs` class with an API similar to `console.log`, but asynchronous by leveraging Promises.

```bash
npm install cloudwatch-logger --save
```

### Usage

With ES2017's async-await syntax, using `cloudwatch-logger` is as simple as:

```js
const CloudWatchLogger = require('cloudwatch-logger');

// this Logger assumes an existing logGroup,
// but creates a new logStream
// all config fields are compulsory
const config = {
  accessKeyId: '<AWS accessKeyId>',
  secretAccessKey: '<AWS secret>',
  region: '<AWS region>',
  logGroupName: '<myLogGroup>',
  logStreamName: '<myLogStream>'
};

const logger = new CloudWatchLogger(config);

// let's make an async IIF so we can `await`
(async () => {
  // the connect() method returns the logger instance itself
  // it creates
  await logger.connect();

  /* logResult is the response object returned by CloudWatchLogs API `putLogEvents` method, see:
   * http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CloudWatchLogs.html#putLogEvents-property
   *
   * the messages are bundled into a single `putLogEvents` call with timestamps set to current UNIX time
   */
  const logResult = await logger.log('Message1', { objects: 'are serialised to JSON' }, 123);

  // we can access the underlying AWS SDK CloudWatchLogs object if we want to do fancy things
  const CloudWatchLogs = logger.getAWSObject();
  // … fancy things …
})();

```

### Requirements

* An AWS account with CloudWatch Logs write permissions
* Node.js 7.6+ for *async-await* support


### Notes

* this library was designed for a rather specific use case and currently does not handle cases like non-existent log groups. Contributions to increase robustness are more than welcome!

