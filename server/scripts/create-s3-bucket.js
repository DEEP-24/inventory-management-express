const invariant = require("tiny-invariant");
const { createS3Bucket } = require("../lib/s3-server");

const BUCKET_NAME = process.env.AWS_BUCKET;

async function main() {
  const AWS_REGION = process.env.AWS_REGION;

  invariant(AWS_REGION, "AWS_REGION is not defined");
  invariant(BUCKET_NAME, "BUCKET_NAME is not defined");

  await createS3Bucket(BUCKET_NAME, "us-west-2");
}

main()
  .then(() => console.log(`S3 bucket - "${BUCKET_NAME}" created 🚀`))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
