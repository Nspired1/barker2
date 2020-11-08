//require("dotenv").config();
const mongoose = require("mongoose");
mongoose.set("debug", true);    //only for development, give descriptive error messages
mongoose.Promise = Promise;     //use Promises in mongoose syntax

mongoose.connect(process.env.MONGO_DB_KEY, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(()=>{
        console.log("Connected to hosted local Mongo database!")
    })
    .catch((error)=>{
        console.log("ERROR: ", error.message)
    });