const express = require('express');
const router = express.Router();
const formidable = require('express-formidable');
const {
  uploadPartsFeatureImage,
  getPartsFeatureImage,
  replacePartsFeatureImage,
} = require('../controllers/partsFeatureImageController.js');

router.post(
  '/upload-parts-feature-image',
  formidable(),
  uploadPartsFeatureImage
);
router.get('/get-parts-feature-image', getPartsFeatureImage);
router.put(
  '/replace-parts-feature-image',
  formidable(),
  replacePartsFeatureImage
);

module.exports = router;
