const express = require("express")
const mongoose = require("mongoose")
const router = express.Router()

//데이터 스키마
const { articleSchema } = require("../schemas/article")
const { commentSchema } = require("../schemas/comment")

const Article = mongoose.model("Article", articleSchema)
const Comment = mongoose.model("Comment", commentSchema)

//라우팅 설정
router.use(function(req, res, next){
    next()
})

/**
* @path {GET} api/articles
* @description 게시물 전체 조회
*/
router.get("/", (req, res) => {
    Article.find()
        .then(artcs => {
            res.json(artcs)
        })
        .catch(err => {
            console.error(err)
        })
})

/**
* @path {POST} api/articles/post
* @description 게시물 등록
*  req.body에 데이터를 담아서 전송
*/
router.post("/post", (req, res) => {
    const artc = new Article()
    artc.title = req.body.title
    artc.contents = req.body.contents
    artc.writer = req.body.writer
    artc.comments = req.body.comments

    artc.save((err, result) => {
        if (err) return res.json({ok: false, err})
        return res.json({
            ok: true,
            result,
        })
    })
})

/**
* @path {POST} api/articles/addComment
* @description 게시물에 대한 댓글 등록
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
            Article.findOne({_id: req.query.artc_id})
                .then(artc => {
                    artc.comments.push(comment)
                    artc.save()
                })
                .catch(err => {
                    console.error(err)
                })
        })
        .catch(err => {
            console.error(err)
        })
    }
)


/**
* @path {Delete} api/articles/delComment
* @description 게시물에 대한 댓글 삭제
*/
router.delete("/delComment", (req, res) => {
    const comment_id = req.query.comment_id
    Comment.deleteOne({_id: comment_id})
        .then(result => {
            res.json({
                ok: true,
                result
            })
            Article.findOne({_id: req.query.artc_id})
                .then(artc => {
                    artc.comments =  artc.comments.filter(
                        it => it._id != comment_id
                    )
                    artc.save()
                })
                .catch(err => {
                    console.error(err)
                })
        })
        .catch(err => {
            console.error(err)
        })
})
module.exports = router
