require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const passport = require("passport");

//use packages
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
app.use(passport.initialize());
require("./config/passport")(passport);

//process variables
const PORT = process.env.PORT || 5000;
const IP = process.env.IP;

//connect to hosted Mongo Atlas database
mongoose.connect(process.env.MONGO_DB_KEY, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(()=>{
    console.log("Connected to hosted Mongo Atlas database!")
})
.catch((error)=>{
    console.log(error);
});

//routes
const users = require("./routes/api/users");
const tweets = require("./routes/api/tweets");
const User = require("./models/User");

//routes handlers
app.use("/api/users", users);
app.use("/api/tweets", tweets);

//root route
app.get("/", (req, res) => {
    console.log(res);
    res.send("Hello World")
});

// to start server, in CLI type "node index.js" or "npx nodemon" or 
// if nodemon is installed globally on your machine "npm run server";
app.listen(PORT, IP, (req, res)=>{
    console.log(`App is intently listening on PORT: ${PORT} and IP: ${IP}`);
})