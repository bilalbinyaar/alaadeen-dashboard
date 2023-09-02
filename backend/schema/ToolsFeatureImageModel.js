const mongoose = require('mongoose');

const toolsFeatureImageSchema = new mongoose.Schema({
  data: Buffer,
  contentType: String,
});

module.exports = mongoose.model('ToolsFeatureImage', toolsFeatureImageSchema);
