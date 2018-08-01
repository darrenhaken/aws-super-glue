const AWS = require('aws-sdk');

const initAws = (region = process.env.AWS_REGION) => AWS.config.update({region: region});

module.exports = {
  initAws: initAws
};
