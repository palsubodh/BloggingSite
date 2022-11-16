const jwt = require("jsonwebtoken")

const auth = async function(req,res,next){

    try{
        let header = req.headers["x-api-key"]

        if(header){
            const decode = await jwt.verify(header,"Subodh@123")
            // console.log(decode)
            req.id=decode
            next()
        }
        else{
            res.status(401).send({msg:"x-api-key is required in header"})
        }
    }catch(err){
        res.status(500).send({status:false,msg:err.message})
    }
}

module.exports.auth=auth