
const express = require('express')
const router = express.Router()
const blogController = require("../controller/blogController")
const authorController = require("../controller/authorController")

router.post('/blogs',blogController.createBlog)

router.post('/authors',authorController.createauther)

router.get('/blogs',blogController.getAllBlogs)

router.put('/blogs/:blogId',blogController.updatedBlog)

router.delete('/blogs/:blogId',blogController.deleteBlog)

router.delete("/blogs", blogController.deleteBlogQuery);



module.exports = router

