const express = require('express')
const router = express.Router()
const pages = require('../controllers/productController.js')
const {isAuthenticatedUser} = require("../middlewares/authMiddlewaresUser.js")
const formidable = require("express-formidable")
router.route('/categories/:categoryname/products').get(pages.topnproduct)

module.exports = router