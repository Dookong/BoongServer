const mongoose = require("mongoose")
const commentSchema = require("./comment")

const articleShema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    contents: {
        type: String,
        required: true
    },
    writer: {
        type: Number,
        required: true,
        ref: "User"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    comments: [ commentSchema ]
})

mongoose.model("Article", articleShema)
module.exports = {articleShema: articleShema}