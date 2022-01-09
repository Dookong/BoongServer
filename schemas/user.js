const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    userId: {
        type: Number,
        unique: true
    },
    nickName: { 
        type: String,
        maxLength: 10,
        unique: true
    },
    picked: [ {
        type: Number,
        ref: "Store"
    } ],
    registered: [ {
        type: Number,
        ref: "Store"
    } ],
    comments: [ {
        type: Number,
        ref: "Comment"
    } ]
})

const User = mongoose.model("User", userSchema)
module.exports = { User }