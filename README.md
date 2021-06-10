# File Sharing using S3 and presigned URL as serverless application 

This example application allows you to upload and download files to and from S3 using Signed URLs.

Large part of the program is designed from the following project: https://aws.amazon.com/blogs/compute/uploading-to-amazon-s3-directly-from-a-web-or-mobile-application/

Important: this application uses various AWS services and there are costs associated with these services after the Free Tier usage - please see the [AWS Pricing page](https://aws.amazon.com/pricing/) for details. You are responsible for any AWS costs incurred. No warranty is implied in this example.

```bash
.
├── README.MD                   <-- This instructions file
├── frontend                    <-- Simple JavaScript application illustrating upload
├── getDownloadURL              <-- Source code for the serverless backend for the download function
├── getUploadURL                <-- Source code for the serverless backend for the upload function
```

## Requirements

* AWS CLI already configured with Administrator permission
* [AWS SAM CLI installed](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html) - minimum version 0.48.
* [NodeJS 12.x installed](https://nodejs.org/en/download/)

## Installation Instructions

1. [Create an AWS account](https://portal.aws.amazon.com/gp/aws/developer/registration/index.html) if you do not already have one and login.

2. Clone the repo onto your local development machine using `git clone`.

### Installing the application

There are two SAM templates available - one provides an open API, the other uses an authorizer. From the command line, deploy the chosen SAM template:

```
cd .. 
sam deploy --guided
```

When prompted for parameters, enter:
- Stack Name: s3Uploader
- AWS Region: your preferred AWS Region (e.g. us-east-1)
- Accept all other defaults.

This takes several minutes to deploy. At the end of the deployment, note the output values, as you need these later.

- The APIendpoint value is important - it looks like https://ab123345677.execute-api.us-west-2.amazonaws.com.
- **The upload URL is your endpoint** with the /uploads route added - for example: https://ab123345677.execute-api.us-west-2.amazonaws.com/uploads.


### Testing with the frontend application

The frontend code is saved in the `frontend` subdirectory. 

1. Before running, you need to set the API Gateway endpoint from the backend deployment on line 51 in the `index.html` file.

2. You cannot run this directly on a local browser, due to way CORS works with localhost. Either [copy the file to an S3 bucket](https://docs.aws.amazon.com/AmazonS3/latest/user-guide/upload-objects.html), or [deploy using AWS Amplify Console](https://aws.amazon.com/amplify/console/).

3. Once the page is loaded from a remote location, upload any file in the front-end and you will see the object in the backend S3 bucket.

4. You can also keep the UID from the frontend and use the download function to retrieve the file.

## Limitations and Future Work

One of the key drawback is the limitation of 100MB due to the cache limit of the browser. Future works will be focused on incorporating streaming data and multipart upload to the application to remove this limitation.


