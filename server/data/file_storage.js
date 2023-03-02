const AWS = require('aws-sdk');
AWS.config.update({region: 'us-west-2'});
const s3 = new AWS.S3({apiVersion: '2006-03-01'});
const bucket = 'dubleaseimages';

exports.getObject = async function(key) {
  const params = {
    Bucket : bucket,
    Key : key,
  }
  try {
    const results = await s3.getObject(params).promise();
    return results;
  } catch (err) {
    console.error(err);
  }
};

exports.uploadObject = async function(key, body, type='image/png', encoding=null) {
  var buf = Buffer.from(body.replace(/^data:image\/\w+;base64,/, ""), encoding);
  const params = {
    Bucket : bucket,
    Key : key,
    Body : buf,
    ContentEncoding: encoding,
    ContentType : type,
  }
  try {
    const results = await s3.upload(params).promise();
    return results.Location;
  } catch (err) {
    console.error(err);
  }
};