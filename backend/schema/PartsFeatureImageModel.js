const mongoose = require('mongoose');

const partsFeatureImageSchema = new mongoose.Schema({
  data: Buffer,
  contentType: String,
});

module.exports = mongoose.model('PartsFeatureImage', partsFeatureImageSchema);
