require("dotenv").config()

//express 모듈 불러오기
const { urlencoded } = require("express");
const express = require("express");

//express 사용
const app = express()
app.use(express.json())
app.use(urlencoded({extended: true}))

//라우터
app.use("/api/users", require("./router/router_user"))
app.use("/api/stores", require("./router/router_store"))
app.use("/api/articles", require("./router/router_article"))
app.use("/api/comments", require("./router/router_comment"))

//서버 실행
app.listen(process.env.PORT, () => console.log("붕어빵:)"));

// 몽고DB 연결
const mongoose = require("mongoose")
mongoose
    .connect(process.env.MONGO_URI, {
        autoIndex: true
    })
    .then(() => console.log("MongoDB 연결 완료!"))
    .catch(err => console.log(err))