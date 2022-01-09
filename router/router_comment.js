const express = require("express")
const mongoose = require("mongoose")
const router = express.Router()

const { commentSchema } = require("../schemas/comment")
const Comment = mongoose.model("Comment", commentSchema)

//라우팅 설정
router.use(function(req, res, next){
    next()
})

/**
* @path {GET} api/comments/:comment_id
* @description 댓글 조회 by comment_id
*/
router.get("/:comment_id", (req, res) => {
    Comment.findOne({_id: req.params._id}, function(err, com){
        if (err) return res.json({ok: false, err})
        return res.json({ok: true, com})
    })
})

/**
* @path {GET} api/comments/user/:user_id
* @description 댓글 조회 by user_id
*/
router.get("/user/:user_id", (req, res) => {
    Comment.find()
        .then(comments => {
            res.json(comments.filter(
                it => it.writer == req.params.user_id
            ))
        })
        .catch(err => {
            console.error(err)
        })
})
module.exports = router
