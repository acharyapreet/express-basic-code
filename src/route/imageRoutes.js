const express = require('express')
const uploader = require('../middleware/multerMiddleware')
const { imageController, showById, deleteById } = require('../controller/imageController')

const imageRouter = express.Router()

imageRouter.post('/', uploader.single('incomingFile'),imageController)
imageRouter.get('/:id',showById)
imageRouter.delete('/:id',deleteById)

module.exports = imageRouter