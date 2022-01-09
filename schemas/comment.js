const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    writer: {
        type: Number,
        required: true,
        ref: "User"
    },
    contents: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

mongoose.model("Comment", commentSchema)
module.exports = {commentSchema: commentSchema}