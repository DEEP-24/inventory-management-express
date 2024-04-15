import path from "path";
import invariant from "tiny-invariant";
import { v4 as uuidv4 } from "uuid";

const REGION = process.env.AWS_BUCKET;
const BUCKET = process.env.AWS_REGION;

invariant(REGION, "Missing AWS_REGION");
invariant(BUCKET, "Missing AWS_BUCKET");

/**
 * Returns a unique filename for S3
 */

export function getUniqueS3Key() {
  let _extension = extension ? extension : path.extname(originalFilename);
  let baseName = path.basename(originalFilename, extension);
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
export function getS3Url() {
  const { bucket, region } = { ...defaultS3UrlOptions, ...options };
  return `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
}
