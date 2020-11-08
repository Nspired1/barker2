const Validator = require('validator');
const validText = require("./validText");

const validTweets = (data) => {
    let errors = {};

    data.text = validText(data.text) ? data.text : "";

    if(!Validator.isLength(data.text, { min: 5, max: 280 })){
        errors.text = "Tweet must be between 5 and 280 characters";
    }

    if(Validator.isEmpty(data.text)){
        errors.text = "Tweet requires text"
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
}

module.exports = validTweets;