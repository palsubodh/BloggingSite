const blogModel = require('../models/bolgModel')
const authorModel = require('../models/authorModel')
const {idCharacterValid,isValidString} = require("../validator/validator");

/***********************************************For create author************************************************************/
const createBlog = async function (req, res) {
  try {
    const data = req.body
    let id = data.authorId
    if (Object.keys(data).length == 0) return res.status(400).send({status: false,msg: "request body is Empty"})

    const {title,body,authorId,category} = data

    if (!title) return res.status(400).send({
      status: false,
      msg: "title is required"
    });
    if (!body) return res.status(400).send({
      status: false,
      msg: "body is required"
    });
    if (!authorId) return res.status(400).send({
      status: false,
      msg: "authorId is required"
    });
    if (!category) return res.status(400).send({
      status: false,
      msg: "category is required"
    });

    if (!isValidString(title)) return res.status(400).send({
      status: false,
      msg: "Please provide valid title"
    })
    if (!isValidString(body)) return res.status(400).send({
      status: false,
      msg: "Please provide valid body"
    })
    if (!isValidString(category)) return res.status(400).send({
      status: false,
      msg: "Please provide valid category"
    });

    if (!idCharacterValid(authorId)) return res.status(400).send({
      status: false,
      msg: "Please provide the valid authorid"
    })
    const authordata = await authorModel.findById(id)
    if (!authordata) return res.status(400).send({
      status: false,
      msg: "author Id doesn't exist"
    })

    const savedData = await blogModel.create(data)
    return res.status(201).send({status: true,data: savedData})
  } catch (error) {
    return res.status(500).send({
      status: false,
      msg: error.message
    })

  }
}

/***********************************************For get all blogs************************************************************/
const getAllBlogs = async (req, res) => {
  try {

    // const {isDeleted,isPublished}= req.query
    
    const blogs = await blogModel.find({$and:[{isDeleted:false},{isPublished:true},req.query]});

   
    if (blogs) {
      res.status(200).send({
        status: true,
        data: blogs
      })
    } else {
      res.status(404).send({
        status: false,
        msg: `${req.params.blogId} id not found!`
      })
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

/***********************************************For update blogs by id************************************************************/

let updatedBlog = async function(req,res){
  try{
    let id = req.params.blogId
    if(!idCharacterValid(id)) return res.status(404).json({status:false,msg:"Invalid blog id"})
    let updateBlog =await blogModel.findOneAndUpdate(
  {_id:id},
  {
    $set:{
      title:req.body.title,
      body:req.body.body,
      category:req.body.category,
      publishedAt:new Date(Date.now()),  //new Date(Date.now())
      isPublished:true,
      isDeleted:false,
    },
    $push:{tags:req.body.tags,subcategory:req.body.subcategory},
  },
  {new:true}
)
return res.status(200).send({status:true,msg:updateBlog})
  } catch(err){
    res.status(500).send({status:false,msg:err.message})
  }
}












/***************************************Update blogs using path params************************************************************/
const deleteBlog = async (req, res) => {
  try {

    let Id = req.params.blogId
    if(!idCharacterValid(Id)) return res.status(400).json({status:false,msg:"Invalid blog id"})
    let checkId = await blogModel.findById(Id)

    if(!checkId || (checkId.isDeleted==true))
    {
      return res.status(404).send({status:false,msg:"Blog has been already deleted"})
    }
    const blog = await blogModel.findOneAndUpdate({_id: req.params.blogId,isDeleted: false}, {$set: {isDeleted: true, deletedAt: new Date()},});

    if (blog) {
      res.status(200).send({status: true,msg: "Blog deleted Successfully"})
    } else {
      res.status(404).send({status: false,msg: `${req.params.blogId} id not found!`})
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message
    });
  }
};

/***************************************Update blogs using query params************************************************************/
const deleteBlogQuery = async (req, res) => {
  try {
    let Id = req.query.blogId
    const blogs = await blogModel.updateMany(req.query, {isDeleted: true}, {new: true});
    let checkId = await blogModel.findById(Id)

    if(!checkId || (checkId.isDeleted==true))
    {
      return res.status(404).send({status:false,msg:"Blog has been already deleted"})
    }

    if (blogs) {
      res.status(200).send({
        status: true,
        msg: `${blogs.modifiedCount} blog deleted success!`
      })
    } else {
      res.status(404).send({
        status: false,
        msg: "blog not found"
      })
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message
    });
  }
};





module.exports.updatedBlog = updatedBlog
module.exports.createBlog = createBlog
module.exports.getAllBlogs = getAllBlogs
module.exports.deleteBlog = deleteBlog
module.exports.deleteBlogQuery=deleteBlogQuery