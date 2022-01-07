const mongoose = require("mongoose")

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
    writer: String,
    contents: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const storeScheme = new mongoose.Schema({
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

const Store = mongoose.model("Store", storeScheme)
module.exports = { storeScheme, commentSchema }