const express = require("express")
const mongoose = require("mongoose")
const router = express.Router()

//데이터 스키마
const { storeSchema } = require("../schemas/store")
const { commentSchema } = require("../schemas/store")

const Store = mongoose.model("Store", storeSchema)
const Comment = mongoose.model("Comment", commentSchema)

//거리 계산 메서드
const { getDistanceBetweenCoord } = require("../utils/distance")

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
* @path {GET} http://localhost:3000/api/stores/:distance
* @description 가게 거리별 조회
*/
router.get("/:distance", (req, res) => {
    const distance = req.params.distance
    
    const coord = req.body.coord
    const currentX = coord.x
    const currentY = coord.y

    Store.find()
        .then(stores => {
            res.json(stores.filter(
                it => {
                    let d = getDistanceBetweenCoord(
                        it.x, it.y, currentX, currentY
                    ) 
                    console.log(`${d} < ${distance}`)
                    return d <= distance
                }
            ))
        })
        .catch(err => {
            console.error(`err: ${err}`)
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
    store.menus = req.body.menus
    store.comments = req.body.comments

    store.save((err, storeInfo) => {
        if (err) return res.json({ok: false, err})
        return res.status(200).json({
            ok: true,
            storeInfo,
        })
    })
})

/**
* @path {POST} http://localhost:3000/api/stores/addComment
* @description 댓글 등록
*  req.body에 데이터를 담아서 전송
*/
router.post("/addComment", (req, res) => {
    const comment = new Comment({
        writer: req.body.userId,
        contents: req.body.contents
    })

    comment.save()
        .then(result => {
            res.json({
                ok: true,
                result
            })
        })
        .catch(err => {
            console.error(err)
        })
})


/**
* @path {Delete} http://localhost:3000/api/stores/delComment
* @description 댓글 삭제
*/
router.delete("/delComment", (req, res) => {
    const comment_id = req.query.comment_id
    Comment.deleteOne({commentId: comment_id})
        .then(result => {
            res.json({
                ok: true,
                result
            })
        })
        .catch(err => {
            console.error(err)
        })
})
module.exports = router
