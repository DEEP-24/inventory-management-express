const express = require("express");
const {
  gettingUniqueS3Key,
  getttingS3SignedUrl,
  gettingS3Url,
  addImage,
} = require("../controllers/image-controller");
const router = express.Router();

router.get("/getUniqueS3Key/:filename/:extension", gettingUniqueS3Key);

router.get("/getS3SignedUrl/:key", getttingS3SignedUrl);

router.get("/getS3Url/:key", gettingS3Url);

module.exports = router;
