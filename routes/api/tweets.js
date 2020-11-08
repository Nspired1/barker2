const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const Tweet = require("../../models/Tweet");
const validateTweetInput = require("../../validation/validTweets");

// get all tweets
router.get("/", (req, res) => {
    Tweet.find()
        .sort({ date: -1 })
        .then(tweets => res.json(tweets))
        .catch(error => res.status(400).json({ notweetsfound: "No tweets found"}))
});

// post tweets by authenticated user
router.post("/", passport.authenticate("jwt", { session: false }), (req, res) => {
    const { isValid, errors} = validateTweetInput(req.body);

    if(!isValid){
        return res.status(400).json(errors);
    }

    const newTweet = new Tweet({
        user: req.user.id,
        text: req.body.text
    });

    newTweet
        .save()
        .then(tweet => res.json(tweet))
})

// find all tweets by a user
router.get("/user/:user_id", (req, res) => {
    Tweet.find({ user: req.params.user_id})
        .then(tweets => res.json(tweets))
        .catch(error => res.status(404).json({ notweetsfound: "No tweets found from that user."}))
});

// find all tweet by tweet id
router.get("/:id", (req, res) => {
    Tweet.findById(req.params.id)
    .then(tweet => res.json(tweet))
    .catch(error => res.status(404).json({ notweetfound: "No tweet found with that ID"}))
})

router.get("/test", (req, res) => {
    res.json({ message: "This is the TEST tweet route"});
});

module.exports = router;