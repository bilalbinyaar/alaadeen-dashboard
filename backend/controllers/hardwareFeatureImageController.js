const HardwareFeatureImageModel = require('../schema/HardwareFeatureImageModel.js');
const fs = require('fs');

exports.uploadHardwareFeatureImage = async (req, res) => {
  try {
    const { image } = req.files;

    if (!image || image.size > 1000000) {
      return res
        .status(400)
        .send({ error: 'Valid image is required and should be less than 1MB' });
    }

    const hardwareFeatureImage = new HardwareFeatureImageModel({
      data: fs.readFileSync(image.path),
      contentType: image.contentType,
    });

    await hardwareFeatureImage.save();

    res.status(201).send({
      success: true,
      message: 'Hardware Feature Image Uploaded Successfully',
      hardwareFeatureImage,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: 'Error uploading hardware feature image',
    });
  }
};

exports.getHardwareFeatureImage = async (req, res) => {
  try {
    const hardwareFeatureImage = await HardwareFeatureImageModel.findOne();
    if (!hardwareFeatureImage) {
      return res
        .status(404)
        .send({ message: 'Hardware Feature Image not found' });
    }

    res.set('Content-type', hardwareFeatureImage.contentType);
    return res.status(200).send(hardwareFeatureImage.data);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: 'Error getting hardware feature image',
    });
  }
};

exports.replaceHardwareFeatureImage = async (req, res) => {
  try {
    const { image } = req.files;

    if (!image || image.size > 1000000) {
      return res.status(400).send({ error: 'Invalid image' });
    }

    const existingImage = await HardwareFeatureImageModel.findOne();

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
