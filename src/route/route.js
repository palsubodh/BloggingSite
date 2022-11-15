
const express = require('express')
const router = express.Router()
const blogController = require("../controller/blogController")
const authorController = require("../controller/authorController")

router.post('/blogs',blogController.createBlog)

router.post('/authors',authorController.createauther)

router.get('/blogs',blogController.getAllBlogs)

module.exports = router

