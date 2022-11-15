const authorModel = require("../models/authorModel");
const {isValidEmail,isValidString,isValidPassword} = require("../validator/validator");


const createauther = async function (req, res) {
  try { 
    let data = req.body;
    const { fname, lname, title, email,password } = data;
    if(Object.keys(data).length==0)  return res.status(400).send({status:false,msg:"request body is Empty"})
    if (!fname)  return res.status(400).send({ status: false, msg: "fname is required" });
    if (!lname)  return res.status(400).send({ status: false, msg: "lname is required" });
    if (!title)  return res.status(400).send({ status: false, msg: "title is required" });
    if (!email)  return res.status(400).send({ status: false, msg: "email is required" });
    if (!password)  return res.status(400).send({ status: false, msg: "password is required" });
    
    if(!isValidString(fname))   return res.status(400).send({ status: false, msg: "Please provide valid fname" })
    if(!isValidString(lname))   return res.status(400).send({ status: false, msg: "Please provide valid lname" })
    
    

    let titles=["Mr","Mrs","Miss"]
    if(!titles.includes(title))  return res.status(400).send({status:false,msg:"Please provide the title in these options - Mr || Mrs || Miss"})
    if(!isValidEmail(email))  return res.status(400).send({status:false,msg:"invalid emailid"})

    if(!isValidPassword(password))  return res.status(400).send({ status: false, msg: "Please provide valid password" })
    let uniqueEmail= await authorModel.findOne({email:email})
    if(uniqueEmail)  return res.status(400).send({status:false,message:"email is already exist"})

    let savedData = await authorModel.create(data);
    return res.status(201).send({ msg: savedData });
  } catch (error) {
    return res.status(500).send({ status: false, msg: error.message });
  }
};


module.exports.createauther = createauther;
