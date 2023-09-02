const ToolsFeatureImageModel = require('../schema/ToolsFeatureImageModel.js');
const fs = require('fs');

exports.uploadToolsFeatureImage = async (req, res) => {
  try {
    const { image } = req.files;

    if (!image || image.size > 1000000) {
      return res
        .status(400)
        .send({ error: 'Valid image is required and should be less than 1MB' });
    }

    const toolsFeatureImage = new ToolsFeatureImageModel({
      data: fs.readFileSync(image.path),
      contentType: image.contentType,
    });

    await toolsFeatureImage.save();

    res.status(201).send({
      success: true,
      message: 'Tools Feature Image Uploaded Successfully',
      toolsFeatureImage,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: 'Error uploading tools feature image',
    });
  }
};

exports.getToolsFeatureImage = async (req, res) => {
  try {
    const toolsFeatureImage = await ToolsFeatureImageModel.findOne();
    if (!toolsFeatureImage) {
      return res.status(404).send({ message: 'Tools Feature Image not found' });
    }

    res.set('Content-type', toolsFeatureImage.contentType);
    return res.status(200).send(toolsFeatureImage.data);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: 'Error getting tools feature image',
    });
  }
};

exports.replaceToolsFeatureImage = async (req, res) => {
  try {
    const { image } = req.files;

    if (!image || image.size > 1000000) {
      return res.status(400).send({ error: 'Invalid image' });
    }

    const existingImage = await ToolsFeatureImageModel.findOne();

    if (!existingImage) {
      return res.status(404).send({ error: 'Image not found' });
    }

    existingImage.data = fs.readFileSync(image.path);
    existingImage.contentType = image.type;
    await existingImage.save();

    res
      .status(200)
      .send({ success: true, message: 'Image replaced successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error: error.message,
      message: 'Error replacing image',
    });
  }
};
