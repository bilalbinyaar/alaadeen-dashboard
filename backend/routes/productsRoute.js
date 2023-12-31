const express = require('express');
const {
  createProductController,
  getProductController,
  getSingleProductController,
  productPhotoController,
  deleteProductController,
  updateProductController,
  getToolsProducts,
  getPartsProducts,
  getHardwareProducts,
} = require('../controllers/productController');
const formidable = require('express-formidable');

const router = express.Router();

router.post('/create-product', formidable(), createProductController);
router.get('/get-product', getProductController);
router.get('/get-product/:slug', getSingleProductController);
router.get('/product-photo/:pid', productPhotoController);
router.delete('/delete-product/:pid', deleteProductController);
router.put('/update-product/:pid', formidable(), updateProductController);
router.get('/tools-products', getToolsProducts);
router.get('/parts-products', getPartsProducts);
router.get('/hardware-products', getHardwareProducts);

module.exports = router;
