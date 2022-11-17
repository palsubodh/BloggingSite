const blogModel = require('../models/bolgModel')
const authorModel = require('../models/authorModel')
const {idCharacterValid,isValidString} = require("../validator/validator");

/****************************For add Blog***********************************/
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

/*******************For get blog******************************/
const getAllBlogs = async (req, res) => {
  try {    
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

/*****************************For update blogs by id**********************************/

let updatedBlog = async function(req,res){
  try{
    let id = req.params.blogId
    if(!idCharacterValid(id)) return res.status(404).json({status:false,msg:"Invalid blog id"})

    let gotid =await blogModel.findById({_id:id})
    if(!gotid) return res.status(400).json({status:false,msg:"This is id not present in DB"})
    let updateBlog =await blogModel.findOneAndUpdate(
  {_id:id},
  {
    $set:{
      title:req.body.title,
      body:req.body.body,
      category:req.body.category,
      publishedAt:new Date(Date.now()),  
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

/*******************Delete Blog by path params***************************/
const deleteBlog = async (req, res) => {
  try {
    let Id = req.params.blogId
     if(!idCharacterValid(Id)) return res.status(400).json({status:false,msg:"Invalid blog id"})
    let checkId = await blogModel.findById(Id)
   if(!checkId || (checkId.isDeleted==true))
    {
      return res.status(404).send({status:false,msg:"Blog has been already deleted"})
    }
    const blog = await blogModel.findOneAndUpdate({_id: req.params.blogId,isDeleted: false}, {$set: {isDeleted: true, deletedAt: new Date(Date.now())},});

    if (blog) {
      res.status(200).send()
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

/*******************Delete Blog by query params***************************/
const deleteBlogQuery = async (req, res) => {
  try {
   
    let checkId = await blogModel.find(req.query).select({_id:0,authorId:1})
    if(checkId.length==0)
    {
      return res.status(404).send({status:false,msg:"No Blog found"})
    }
    let count=0
  for(let i=0;i<checkId.length;i++)
  {
    // console.log(req.id)
    // console.log((checkId[i].authorId).toString())
    if((checkId[i].authorId).toString()==req.id)
    {
      count++ 
    }
  }
  //console.log(count)
  if(count==0) return res.status(404).json({status:false,msg:"Unauthorised author"})

    const blogs = await blogModel.updateMany({$and:[{isDeleted:false,authorId:req.id},req.query]},{isDeleted:true,deletedAt:new Date(Date.now())}, {new: true});

    if (blogs.modifiedCount>0) {
      res.status(200).send({
        status: true,
        msg: `${blogs.modifiedCount} blog deleted success!`
      })
    } else {
      res.status(404).send({
        status: false,
        msg: "Blog is already deleted"
      })
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message
    });
  }
};





module.exports={updatedBlog ,createBlog,getAllBlogs,deleteBlog,deleteBlogQuery}