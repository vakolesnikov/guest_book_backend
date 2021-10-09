require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const {authRouter, usersRouter, postsRouter} = require('./routers/index')
const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use("/auth", authRouter)
app.use("/users", usersRouter)
app.use("/posts", postsRouter)

const start = async () => {
    try {
        await mongoose.connect(`mongodb+srv://kolesnikov:PassWord123@cluster0.9bitq.mongodb.net/guest_book?retryWrites=true&w=majority`)
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()