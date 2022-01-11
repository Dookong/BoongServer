const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    userId: {
        type: Number,
        unique: true,
        required: true
    },
    nickName: { 
        type: String,
        maxLength: 10,
        unique: true
    },
    picked: [ {
        type: String,
        ref: "Store"
    } ],
    registered: [ {
        type: String,
        ref: "Store"
    } ],
    comments: [ {
        type: String,
        ref: "Comment"
    } ]
})

const User = mongoose.model("User", userSchema)
module.exports = { User }