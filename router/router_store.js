const express = require("express")
const mongoose = require("mongoose")
const router = express.Router()

//데이터 스키마
const { storeSchema } = require("../models/store")
const Store = mongoose.model("Store", storeSchema)

//라우팅 설정
router.use(function(req, res, next){
    next()
})

/**
* @path {GET} http://localhost:3000/api/stores
* @description 가게 전체 조회
*/
router.get("/", (req, res) => {
    Store.find()
        .then(stores => {
            res.json(stores)
        })
        .catch(err => {
            console.error(err)
        })
})


/**
* @path {POST} http://localhost:3000/api/stores/register
* @description 가게 등록
*  req.body에 데이터를 담아서 전송
*/
router.post("/register", (req, res) => {
    const store = new Store()
    
    store.storeName = req.body.storeName
    store.registrant = req.body.registrant
    store.address = req.body.address
    store.x = req.body.x
    store.y = req.body.y
    store.desc = req.body.desc
    store.menus = []
    store.comments = []

    store.save((err, storeInfo) => {
        if (err) return res.json({ok: false, err})
        return res.status(200).json({
            ok: true,
            storeInfo,
        })
    })
})

module.exports = router