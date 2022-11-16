const authorization = async function(req,res,next){
    try{
        const id = req.id
        console.log("id is ",id)
        const userId = req.query.authorId
        if(userId!=id.id) return res.status(403).send({status:false,msg:"Unauthorised author"})
        next()
    }catch(err){
        res.status(500).send({status:false,msg:err.message})
    }
}
module.exports.authorization=authorization