const AWS = require('aws-sdk')

AWS.config.update({ region: process.env.AWS_REGION })
const s3 = new AWS.S3()

// Change this value to adjust the signed URL's expiration
const URL_EXPIRATION_SECONDS = 300

// Main Lambda entry point
exports.handler = async (event) => {
  return await getUploadURL(event)
}

const getUploadURL = async function(event) {
  
  console.info("EVENT\n" + JSON.stringify(event, null, 2))
  
  let fileFullName = event.queryStringParameters.fileName

  
  const contentType = event.queryStringParameters.contentType
  
  console.log(contentType)
  const randomID = parseInt(Math.random() * 10000000)
  //const Key = '${randomID}.jpg'
  const Key = fileFullName

  // Get signed URL from S3
  const s3Params = {
    Bucket: process.env.UploadBucket + '/' +randomID,
    Key,
    Expires: URL_EXPIRATION_SECONDS,
    ContentType: contentType,

    // This ACL makes the uploaded object publicly readable. You must also uncomment
    // the extra permission for the Lambda function in the SAM template.

    // ACL: 'public-read'
  }

  console.log('Params: ', s3Params)
  const uploadURL = await s3.getSignedUrlPromise('putObject', s3Params)

  return JSON.stringify({
    uploadURL: uploadURL,
    Key,
    contentType,
    ID: randomID
  })
}
