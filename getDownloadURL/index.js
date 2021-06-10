const AWS = require('aws-sdk')

AWS.config.update({ region: process.env.AWS_REGION })
const s3 = new AWS.S3()

// Change this value to adjust the signed URL's expiration
const URL_EXPIRATION_SECONDS = 300

exports.handler = async (event,calllback) => {
    // TODO implement
    
    //console.info("EVENT\n" + JSON.stringify(event, null, 2))
    
    let ID = event.queryStringParameters.ID

    var bucket_list_params = {
    Bucket: process.env.bucket, 
    MaxKeys: 10,
    Prefix: ID
    };
    
    
    const myItems = await s3.listObjects(bucket_list_params).promise()
    
    console.log(myItems.Contents)
    
    if (myItems.Contents[0] === undefined) {
        return JSON.stringify({
        object_key: -1,
        downloadURL: -1,
    })
    }
    
    
    //for (let index = 0; index < myItems.Contents.length; index++) {
    var full_key = myItems.Contents[0]['Key']
    var splits = full_key.split('/')
    var object_key = splits.pop()
    console.log(object_key)
        
    var objectParams = {
        Bucket: process.env.bucket + '/' + ID,
        Key: object_key,
        Expires: URL_EXPIRATION_SECONDS,
    }
        
    const downloadURL = await s3.getSignedUrl('getObject', objectParams)

    console.log(downloadURL)

    //}
    
    return JSON.stringify({
        object_key,
        downloadURL,
    })
}

  

  

