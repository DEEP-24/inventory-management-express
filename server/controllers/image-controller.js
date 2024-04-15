const mime = require("mime-types");
const { getUniqueS3Key, getS3Url } = require("../lib/s3-utils");
const { getS3SignedUrl } = require("../lib/s3-server");

exports.gettingUniqueS3Key = async (req, res) => {
  const { filename, extension } = req.params;
  if (!filename) return res.status(400).json({ error: "Filename is required" });

  try {
    const key = getUniqueS3Key(filename, extension);
    res.json({ key });
  } catch (error) {
    console.error("Error getting unique S3 key:", error);
    res.status(500).json({ error: "Error getting unique S3 key" });
  }
};

exports.getttingS3SignedUrl = async (req, res) => {
  const { key } = req.params;
  if (!key) return res.status(400).json({ error: "Key is required" });

  try {
    const signedUrl = await getS3SignedUrl(key);
    res.json({ signedUrl });
  } catch (error) {
    console.error("Error getting signed URL:", error);
    res.status(500).json({ error: "Error getting signed URL" });
  }
};

exports.gettingS3Url = async (req, res) => {
  const { key } = req.params;
  if (!key) {
    return res.status(400).json({ error: "Key is required" });
  }

  try {
    const url = getS3Url(key);
    res.json({ url });
  } catch (error) {
    console.error("Error generating S3 URL:", error);
    res.status(500).json({ error: "Error generating S3 URL" });
  }
};
