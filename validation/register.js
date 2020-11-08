const Validator = require("validator");
const validText = require("./validText");

const register = (data) => {
    let errors = {};

    data.handle = validText(data.handle) ? data.handle : "";
    data.email = validText(data.email) ? data.email : "";
    data.password = validText(data.password) ? data.password : "";
    data.password2 = validText(data.password2) ? data.password2 : "";

    //check min and max length of handle (username)
    if (!Validator.isLength(data.handle, { min: 2, max: 30})){
        errors.handle = "Handle must be between 2 and 20 characters";
    }

    //check if handle is blank
    if (Validator.isEmpty(data.handle)){
        errors.handle = "Handle is required";
    }

    //check if email is blank
    if (Validator.isEmpty(data.email)){
        errors.email = "Email is required";
    }

    //check if email is an email (proper email format)
    if (!Validator.isEmail(data.email)){
        errors.email = "Email is invalid";
    }

    //check if password is blank
    if(Validator.isEmpty(data.password)){
        errors.password = "Password is required";
    }

    //check min and max length for password
    if (!Validator.isLength(data.password, { min: 8, max: 30})){
        errors.password = "Password must be between 8 and 20 characters";
    }

    //two password fields must match
    if (!Validator.equals(data.password, data.password2)){
        errors.password2 = "Password must be the same";
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}

module.exports = register;