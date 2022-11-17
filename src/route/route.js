
const express = require('express')
const router = express.Router()
const blogController = require("../controller/blogController")
const authorController = require("../controller/authorController")
const loginController = require('../controller/loginController')
const authmiddleware = require("../middleware/auth")
const authormiddleware = require("../middleware/authorization")

router.post('/authors',authorController.createauther)
router.post("/login",loginController.login)

router.get('/blogs',authmiddleware.auth,blogController.getAllBlogs)
router.post('/blogs',authmiddleware.auth,blogController.createBlog)
router.put('/blogs/:blogId',authmiddleware.auth,authormiddleware.authorization,blogController.updatedBlog)
router.delete('/blogs/:blogId',authmiddleware.auth,authormiddleware.authorization,blogController.deleteBlog)
router.delete("/blogs", authmiddleware.auth,blogController.deleteBlogQuery);

module.exports = router

