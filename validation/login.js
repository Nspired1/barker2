const Validator = require('validator');
const checkText = require("./validText");

const checkLogin = (data) => {
    let errors = {};
    data.email = checkText(data.email) ? data.email : ''
    data.password = checkText(data.password) ? data.password : ''

    if (!Validator.isEmail(data.email)){
        errors.email = "Not a valid email";
    }

    if(Validator.isEmpty(data.email)){
        errors.email = "Email is required";
    }

    if(Validator.isEmpty(data.password)){
        errors.password = "Password is required";
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}


module.exports = checkLogin;