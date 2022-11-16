const jwt = require("jsonwebtoken")
const authorModel = require("../models/authorModel")


const login = async function(req,res){

    try{
        const{email,password}=req.body

        const fetchdata = await authorModel.findOne({email:email,password:password})

        if(fetchdata==null) return res.status(401).send({status:false,msg:"Doesn't match the email and password"})
        // console.log("login success")

        const mytoken = jwt.sign({email:email,id:fetchdata._id},"Subodh@123")
        console.log(mytoken)
        res.status(200).send({status:true,data:mytoken})
    }catch(err)
    {
        res.status(500).send({status:false,msg:err.message})
    }
}

module.exports.login=login