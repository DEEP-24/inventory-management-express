const {
  CreateBucketCommand,
  DeleteObjectCommand,
  DeleteObjectsCommand,
  PutBucketCorsCommand,
  PutBucketPolicyCommand,
  PutObjectCommand,
  PutPublicAccessBlockCommand,
  S3Client,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const invariant = require("tiny-invariant");
require("dotenv").config();

const _REGION = process.env.AWS_REGION;
const _BUCKET = process.env.AWS_BUCKET;
const _ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const _SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;

invariant(_REGION, "Missing AWS_REGION");
invariant(_BUCKET, "Missing AWS_BUCKET");
invariant(_ACCESS_KEY_ID, "Missing AWS_ACCESS_KEY_ID");
invariant(_SECRET_ACCESS_KEY, "Missing AWS_SECRET_ACCESS_KEY");

/**
 * Creates an S3 client.
 *
 * {@link https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/getting-started-nodejs.html}
 */
const s3Client = new S3Client({
  credentials: {
    accessKeyId: _ACCESS_KEY_ID,
    secretAccessKey: _SECRET_ACCESS_KEY,
  },
  region: _REGION,
});

/**
 * Default options for the S3 Signed Url function
 */
const defaultS3SignedUrlOptions = {
  bucket: _BUCKET,
  expiresIn: 60,
};

/**
 * Generates a signed URL for uploading an object to an S3 bucket.
 *
 * {@link https://docs.aws.amazon.com/AmazonS3/latest/userguide/example_s3_Scenario_PresignedUrl_section.html}
 */
async function getS3SignedUrl(key, options = defaultS3SignedUrlOptions) {
  const { directory, bucket, expiresIn } = {
    ...defaultS3SignedUrlOptions,
    ...options,
  };

  const nestedKey = directory ? `${directory}/${key}` : key;
  const signedUrl = await getSignedUrl(
    s3Client,
    new PutObjectCommand({
      Bucket: bucket,
      Key: nestedKey,
    }),
    {
      expiresIn: expiresIn,
    }
  );

  return signedUrl;
}

/**
 * Deletes an object from an S3 bucket.
 *
 * {@link https://docs.aws.amazon.com/AmazonS3/latest/userguide/example_s3_DeleteObject_section.html}
 */
function deleteS3Object() {
  return s3Client.send(
    new DeleteObjectCommand({
      Bucket: bucket,
      Key: key,
    })
  );
}

/**
 * Deletes multiple objects from an S3 bucket.
 *
 * {@link https://docs.aws.amazon.com/AmazonS3/latest/userguide/example_s3_DeleteObjects_section.html}
 */
function deleteS3Objects() {
  return s3Client.send(
    new DeleteObjectsCommand({
      Bucket: bucket,
      Delete: {
        Objects: keys.map((key) => ({ Key: key })),
      },
    })
  );
}

/**
 * Creates an S3 bucket.
 *
 * Creating a bucket {@link https://docs.aws.amazon.com/AmazonS3/latest/userguide/example_s3_CreateBucket_section.html}
 *
 * Configure CORS: {@link https://docs.aws.amazon.com/AmazonS3/latest/userguide/example_s3_PutBucketCors_section.html}
 *
 * Configure public access: {@link https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/classes/putpublicaccessblockcommand.html}
 */
async function createS3Bucket(name, region) {
  await s3Client.send(
    new CreateBucketCommand({
      Bucket: name,
      CreateBucketConfiguration: {
        LocationConstraint: region,
      },
    })
  );

  await s3Client.send(
    new PutBucketCorsCommand({
      Bucket: name,
      CORSConfiguration: {
        CORSRules: [
          {
            AllowedHeaders: ["*"],
            AllowedMethods: ["GET", "PUT", "DELETE"],
            AllowedOrigins: ["*"],
            ExposeHeaders: [""],
          },
        ],
      },
    })
  );

  await s3Client.send(
    new PutPublicAccessBlockCommand({
      Bucket: name,
      PublicAccessBlockConfiguration: {
        BlockPublicAcls: false,
        IgnorePublicAcls: false,
        BlockPublicPolicy: false,
        RestrictPublicBuckets: false,
      },
    })
  );

  await s3Client.send(
    new PutBucketPolicyCommand({
      Bucket: name,
      Policy: JSON.stringify({
        Version: "2012-10-17",
        // Id: "Policy1690158763249",
        Id: `Policy${Date.now()}`,
        Statement: [
          {
            Sid: "Stmt1690158759008",
            Effect: "Allow",
            Principal: "*",
            Action: "s3:GetObject",
            Resource: `arn:aws:s3:::${name}/*`,
          },
        ],
      }),
    })
  );
}

module.exports = {
  createS3Bucket,
  deleteS3Object,
  deleteS3Objects,
  getS3SignedUrl,
};
