const PartsFeatureImageModel = require('../schema/PartsFeatureImageModel.js');
const fs = require('fs');

exports.uploadPartsFeatureImage = async (req, res) => {
  try {
    const { image } = req.files;

    if (!image || image.size > 1000000) {
      return res
        .status(400)
        .send({ error: 'Valid image is required and should be less than 1MB' });
    }

    const partsFeatureImage = new PartsFeatureImageModel({
      data: fs.readFileSync(image.path),
      contentType: image.contentType,
    });

    await partsFeatureImage.save();

    res.status(201).send({
      success: true,
      message: 'Parts Feature Image Uploaded Successfully',
      partsFeatureImage,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: 'Error uploading parts feature image',
    });
  }
};

exports.getPartsFeatureImage = async (req, res) => {
  try {
    const partsFeatureImage = await PartsFeatureImageModel.findOne();
    if (!partsFeatureImage) {
      return res.status(404).send({ message: 'Parts Feature Image not found' });
    }

    res.set('Content-type', partsFeatureImage.contentType);
    return res.status(200).send(partsFeatureImage.data);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: 'Error getting parts feature image',
    });
  }
};

exports.replacePartsFeatureImage = async (req, res) => {
  try {
    const { image } = req.files;

    if (!image || image.size > 1000000) {
      return res.status(400).send({ error: 'Invalid image' });
    }

    const existingImage = await PartsFeatureImageModel.findOne();

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
