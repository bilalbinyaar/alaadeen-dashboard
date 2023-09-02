const express = require('express');
const router = express.Router();
const formidable = require('express-formidable');
const {
  uploadToolsFeatureImage,
  getToolsFeatureImage,
  replaceToolsFeatureImage,
} = require('../controllers/toolsFeatureImageController.js');

router.post(
  '/upload-tools-feature-image',
  formidable(),
  uploadToolsFeatureImage
);
router.get('/get-tools-feature-image', getToolsFeatureImage);
router.put(
  '/replace-tools-feature-image',
  formidable(),
  replaceToolsFeatureImage
);

module.exports = router;
