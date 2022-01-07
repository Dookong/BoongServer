const mongoose = require("mongoose")
const storeSchema = require("./store")
const commentSchema = require("./store")

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
    picked: [ storeSchema ],
    registered: [ storeSchema ],
    comments: [ commentSchema ]
})

const User = mongoose.model("User", userSchema)
module.exports = { User }