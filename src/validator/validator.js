
const mongoose = require("mongoose")

const isValidEmail = function (value) {
  let emailRegex =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-z\-0-9]+\.)+[a-z]{2,3}))$/
   
  if (emailRegex.test(value)) return true;
};

const idCharacterValid = function (value) {
    return mongoose.Types.ObjectId.isValid(value);
   
  //if(validId.test(value)) return true;
};


const isValidString = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;  
    return true;
};
  
const isValidPassword = function (pw) {
    let pass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,15}$/;
    if (pass.test(pw)) return true;
  };








  
  
module.exports={isValidEmail,idCharacterValid,isValidString,isValidPassword}