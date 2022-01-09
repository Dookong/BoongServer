const mongoose = require("mongoose")
const commentSchema = require("./comment")


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

//storeSchema.plugin(autoIncrement, {inc_field: 'storeId'})
//commentSchema.plugin(autoIncrement, {inc_field: 'commentId'})

mongoose.model("Store", storeSchema)
module.exports = { storeScheme: storeSchema }