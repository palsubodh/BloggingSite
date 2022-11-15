const blogModel= require('../models/bolgModel')
const authorModel= require('../models/authorModel')
const {idCharacterValid,isValidString} = require("../validator/validator");

const createBlog =async function (req,res){
    try{
        const data= req.body
        let id = data.authorId
        if(Object.keys(data).length==0)  return res.status(400).send({status:false,msg:"request body is Empty"})
        const {title,body,authorId,category}=data

        if (!title)  return res.status(400).send({ status: false, msg: "title is required" });
        if (!body)  return res.status(400).send({ status: false, msg: "body is required" });
        if (!authorId)  return res.status(400).send({ status: false, msg: "authorId is required" });
        if (!category)  return res.status(400).send({ status: false, msg: "category is required" });

        if(!isValidString(title))   return res.status(400).send({ status: false, msg: "Please provide valid title" })
        if(!isValidString(body))   return res.status(400).send({ status: false, msg: "Please provide valid body" })
        if(!isValidString(category))   return res.status(400).send({ status: false, msg: "Please provide valid category" });
        
        if(!idCharacterValid(authorId))   return res.status(400).send({status:false,msg:"Please provide the valid authorid"})
        const authordata = await authorModel.findById(id)
        if(!authordata)  return res.status(400).send({status:false,msg:"author Id doesn't exist"})
        
        const savedData = await blogModel.create(data)
        return  res.status(201).send({status:true,data:savedData})
     }catch(error){
        return res.status(500).send({status:false,msg:error.message})
    }
}

const getAllBlogs = async (req, res) => {
    try {
      const blogs = await blogModel.find(req.query); 
      res.status(200).json({
        status: true,
        result: `${blogs.length} blogs found!`,
        blogs,
      });
    } catch (error) {
      res.status(404).json({
        status: "Not found",
        error: error.message,
      });
    }
  };


// module.exports.getData=getData 
module.exports.createBlog= createBlog 
module.exports.getAllBlogs=getAllBlogs
