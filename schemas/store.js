const mongoose = require("mongoose")
const autoIncrement = require("mongoose-sequence")(mongoose)

const menuSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

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

const storeSchema = new mongoose.Schema({
    createdOrEditedAt: {
        type: Date,
        default: Date.now
    },
    storeName: String,
    registrant: String,
    desc: String,
    address: String,
    x: Number,
    y: Number,
    menus: [ menuSchema ], 
    comments: [ commentSchema ]
})

storeSchema.plugin(autoIncrement, {inc_field: 'storeId'})
commentSchema.plugin(autoIncrement, {inc_field: 'commentId'})

mongoose.model("Store", storeSchema)
mongoose.model("Comment", commentSchema)
module.exports = { storeScheme: storeSchema, commentSchema: commentSchema }