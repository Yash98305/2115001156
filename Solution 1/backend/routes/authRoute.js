const express = require('express')
const router = express.Router()
const pages = require('../controllers/authController.js')
const {isAuthenticatedUser, isLoggedIn} = require("../middlewares/authMiddlewaresUser.js")
const formidable = require("express-formidable")
router.route('/login').post(pages.userLoginController)
router.route('/register').post(pages.userRegisterController)

module.exports = router