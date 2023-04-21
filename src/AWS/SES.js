const AWS = require("aws-sdk");
const { AWS_ACCESS_ID, AWS_SECRET_KEY } = require("../../Variables");
const ses = new AWS.SES({
  accessKeyId: AWS_ACCESS_ID,
  secretAccessKey: AWS_SECRET_KEY,
  region: "eu-central-1",
});

module.exports = ses;
