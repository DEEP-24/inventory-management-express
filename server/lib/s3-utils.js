const path = require("path");
const invariant = require("tiny-invariant");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

const REGION = process.env.AWS_REGION;
const BUCKET = process.env.AWS_BUCKET;

invariant(REGION, "Missing AWS_REGION");
invariant(BUCKET, "Missing AWS_BUCKET");

/**
 * Returns a unique filename for S3
 */

function getUniqueS3Key(filename, extension) {
  let _extension = extension ? extension : path.extname(filename);
  let baseName = path.basename(filename, extension);
  let safeFilename = baseName.replace(/[^a-zA-Z0-9]/g, "_");
  let uniqueId = uuidv4();
  return `${safeFilename}_${uniqueId}${_extension}`;
}

/**
 * Default options for the S3 Url function
 */
const defaultS3UrlOptions = {
  bucket: BUCKET,
  region: REGION,
};

/**
 * Generates a URL for accessing an object in an S3 bucket.
 */
function getS3Url(key, options = defaultS3UrlOptions) {
  const { bucket, region } = { ...defaultS3UrlOptions, ...options };
  return `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
}

module.exports = { getUniqueS3Key, getS3Url };
