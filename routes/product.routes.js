const express = require('express');
const router = express.Router();
const { 
    addProduct, 
    getProducts, 
    getAProduct,
    delAProduct,
    updateAProduct
} = require('../controller/product.controller');

router.get('/', getProducts);

router.get('/:id', getAProduct);



router.post('/', addProduct);

router.delete('/:id', delAProduct);

router.put('/:id', updateAProduct);



module.exports = router;