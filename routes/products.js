const express = require('express')
const productsController = require('../controller/products')

const router = express.Router();

router.get('/products', productsController.getProducts)
router.post('/products', productsController.postProducts)
router.delete('/products/:id', productsController.deleteProduct)
router.post('/products/:id', productsController.updateProduct)
router.get('/products/:id', productsController.getOneProduct)

module.exports = router;