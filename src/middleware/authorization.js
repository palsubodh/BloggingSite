
const blogModel = require('../models/bolgModel')

const authorization = async function(req,res,next){
    try{
        const id = req.id
        const userId = req.params.blogId
       
        const data = await blogModel.findById(userId)
        if(!data) return res.status(404).json({status:false,msg:"Invaild blogId"})
        const dataId  =  data.authorId
         if(dataId==id) {
            next()
        }
        else
        {
            return res.status(403).send({status:false,msg:"Unauthorised author"})
        }
        
    }catch(err){
        res.status(500).send({status:false,msg:err.message})
    }
}
module.exports.authorization=authorization