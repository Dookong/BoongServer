const express = require("express")
const router = express.Router()

//데이터 스키마
const { User } = require("../schemas/user")

router.use(function(req, res, next){
    next()
})

/**
* @path {GET} api/users
* @description 회원 전체 조회
*/
router.get("/", (req, res) => {
    User.find()
        .then(users => {
            res.json(users)
        })
        .catch(err => {
            console.error(err)
        })
})

/**
* @path {GET} api/users/user?user_id=12345678
* @description 회원 조회 by userId
*/
router.get("/user", (req, res) => {
    User.findOne({userId: req.query.user_id}, function(err, user){
        if (err) return res.json({ok: false, err})
        return res.json({ok: true, user})
    })
})

/**
* @path {GET} api/users/userName?user_name=김만득
* @description 회원 조회 by userName
*/
router.get("/userName", (req, res) => {
    User.findOne({nickName: req.query.user_name}, function(err, user){
        if (err) return res.json({ok: false, err})
        return res.json({ok: true, user})
    })
})

/**
* @path {GET} api/users/:user_id
* @description Path Variables 요청 데이터 값이 있고 반환 값이 있는 GET Method 
* Path Variables 방식: 다른 라우터 보다 아래 있어야 한다.
*/
router.get("/:user_id", (req, res) => {

    const user_id = req.params.user_id
    const user = users.filter(data => data.id == user_id);

    res.json({ok: true, user: user})
})


/**
* @path {POST} api/users/register
* @description 회원 등록
*  req.body에 데이터를 담아서 전송
*/
router.post("/register", (req, res) => {
    const user = new User(req.body)

    user.save((err, userInfo) => {
        if (err) return res.json({ok: false, err})
        return res.status(200).json({
            ok: true,
            userInfo,
        })
    })
})

/**
* @path {PUT} api/users/update
* @description 전체 데이터를 수정할 때 사용되는 Method
*/
router.put("/update", (req, res) => {
    
    // 구조분해를 통해 id 와 name을 추출
    const { id, name } = req.body

    //map 함수는 자바스크립트에서 배열 함수이다. 요소를 일괄적으로 변경할 때 사용됩니다.
    const user = users.map(data => {

        if(data.id == id) data.name = name

        return {
            id: data.id,
            name: data.name
        }
    })

    res.json({ok: true, users: user})
})


/**
* @path {DELETE} api/user/delete
* @description 회원 탈퇴 by userId
* 
*/
router.delete("/delete", (req, res) => {
    const user_id = req.query.user_id
    User.deleteOne({userId: user_id})
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
* @path {GET} api/users/pick?user_id=12345678?store_id=61d7f94cb88dedbd93140fab
* @description 가게 찜하기
*/
router.post("/pick", (req, res) => {
    User.findOne({userId: req.query.user_id}, function(err, user){
        if (err) return res.json({ok: false, err})
        user.picked.push(req.query.store_id)
        user.picked = [...new Set(user.picked)]
        user.save()
        return res.json({ok: true, user})
    })
})
module.exports = router