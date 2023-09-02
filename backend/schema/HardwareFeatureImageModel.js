const mongoose = require('mongoose');

const hardwareFeatureImageSchema = new mongoose.Schema({
  data: Buffer,
  contentType: String,
});

module.exports = mongoose.model(
  'HardwareFeatureImage',
  hardwareFeatureImageSchema
);
