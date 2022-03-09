// implement your server here
// require your posts router and connect it here
const express = requier('express')
const postRouter = requier('./posts/posts-router')

const server = express()

server.use(express.json())

server.use('/api/posts', postRouter)

module.exports = server