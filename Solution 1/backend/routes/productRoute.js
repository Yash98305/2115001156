const express = require('express')
const router = express.Router()
const pages = require('../controllers/productController.js')
const {isAuthenticatedUser} = require("../middlewares/authMiddlewaresUser.js")
const formidable = require("express-formidable")

router.get('/categories/:categoryname/products',pages.allProducts)
router.get('/categories/:categoryname/products/:productid',pages.singleProduct);

module.exports = router