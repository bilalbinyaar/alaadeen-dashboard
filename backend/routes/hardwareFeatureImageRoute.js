const express = require('express');
const router = express.Router();
const formidable = require('express-formidable');
const {
  uploadHardwareFeatureImage,
  getHardwareFeatureImage,
  replaceHardwareFeatureImage,
} = require('../controllers/hardwareFeatureImageController.js');

router.post(
  '/upload-hardware-feature-image',
  formidable(),
  uploadHardwareFeatureImage
);
router.get('/get-hardware-feature-image', getHardwareFeatureImage);
router.put(
  '/replace-hardware-feature-image',
  formidable(),
  replaceHardwareFeatureImage
);

module.exports = router;
